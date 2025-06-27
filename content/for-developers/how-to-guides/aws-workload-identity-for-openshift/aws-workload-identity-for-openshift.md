# Configure AWS Workload Identity for OpenShift Clusters

This guide provides step-by-step instructions for setting up AWS Workload Identity for OpenShift clusters.

## Objectives

- Configure AWS Workload Identity for OpenShift and use that for provisioning AWS infrastructure using crossplane.

## Key Results

- Developers can provision AWS infrastructure securely via Crossplane without embedding or managing static AWS credentials in OpenShift.

- Improved security posture by eliminating long-lived credentials.

- Simplified access management using native Kubernetes service account annotations.

## Guide

### Prerequisite

- An OpenShift cluster where you have cluster-administrator privileges.

- AWS CLI configured with permissions to create IAM roles and OIDC providers.

- Crossplane installed in your cluster (with the AWS provider).

### Step 1: Retrieve the Cluster’s JWKs

Fetch the JSON Web Key Set (JWKS) for your OpenShift cluster:

```bash
kubectl get --raw /openid/v1/jwks > jwks.json
```

**Output:** `jwks.json` containing the public keys used to verify tokens.

### Step 2: Prepare OIDC Configuration Files

- `openid-configuration`

  Copy the output of:

  ```bash
  kubectl get --raw /.well-known/openid-configuration
  ```

  and save as openid-configuration.
  You would notice that `issuer` and `jwks_uri` has `kubernetes.default.svc` set. In later stage, we will update this.

- `jwks.json`

  Ensure the file from step 1 above is named `jwks.json`.

### Step 3: Host Files in S3 (or Other Object Storage)

- Create an S3 bucket.

- Disable `Block all public access` so that `.well-known` folder can be accessed globally.

- At this point, you would have public URL for this bucket. Update openid-configuration file and replace `kubernetes.default.svc` with bucket URL.

- Upload both JSON files under a folder named `.well-known/`:

  ```bash
  .well-known/
  ├── jwks.json
  └── openid-configuration
  ```

- Apply a bucket policy to restrict public read to only these files:

  ```json
  {
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowPublicReadWellKnown",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": [
        "arn:aws:s3:::<bucket name>/.well-known/jwks.json",
        "arn:aws:s3:::<bucket name>/.well-known/openid-configuration"
      ]
    }
  ]
  }
  ```

### Step 4: Create AWS OIDC Identity Provider

- In the AWS console, go to IAM → Identity providers and click Add provider.

- Provider type: `OpenID Connect`

- Provider URL: Paste in the bucket URL that was created in step 3.

- Audience: `sts.amazonaws.com`

### Step 5: Define an IAM Role for Your Workloads

- **Permissions:** Attach an IAM policy (or existing managed policy) granting the actions your Crossplane controllers need.

- **Trust relationship:** Restrict assume-role to your OpenShift service accounts:

  ```json
  {
    "Version": "2012-10-17",
    "Statement": [
      {
        "Effect": "Allow",
        "Principal": {
          "Federated": "<Identity Provider ARN.>"
        },
        "Action": "sts:AssumeRoleWithWebIdentity",
        "Condition": {
          "StringLike": {
            "<S3 bucket URL>:sub": "system:serviceaccount:<namespace where crossplane compostition would run>:*"
          }
        }
      }
    ]
  }
  ```

### Step 6: Configure the OpenShift OIDC Issuer

Edit the Authentication custom resource in your management cluster:

  ```yaml
  apiVersion: config.openshift.io/v1
  kind: Authentication
  metadata:
    name: cluster
  spec:
    serviceAccountIssuer: "<s3 bucket url>"
  ```
  
  Apply the change:

  ```bash
  oc apply -f authentication-issuer.yaml
  ```

### Step 7: Verify Token Issuer

Create a service account token to confirm the issuer:

```bash
TOKEN=$(oc serviceaccounts get-token default -n default)
echo $TOKEN | jwt decode --json | jq .iss
```

You should see your S3 bucket URL as the `iss` claim.

### Step 8: Deploy the Pod Identity Webhook

[This mutating webhook](https://github.com/aws/amazon-eks-pod-identity-webhook/tree/master) will inject tokens into provider pods:

- Create a `webhook-values.yaml` (example values shown below).

- Install with Helm:

  ```bash
  helm repo add jkroepke https://jkroepke.github.io/amazon-eks-pod-identity-webhook
  helm install pod-identity-webhook jkroepke/amazon-eks-pod-identity-webhook \
  --namespace <crossplane namespace> \
  --version 2.5.2 \
  -f webhook-values.yaml
  ```

<details> <summary><strong>Minimal <code>webhook-values.yaml</code> Example</strong></summary>

```yaml
config:
  annotationPrefix: eks.amazonaws.com
  defaultAwsRegion: eu-north-1
  tokenAudience: sts.amazonaws.com
  tokenExpiration: 86400

mutatingWebhook:
  namespaceSelector:
    matchExpressions:
      - key: kubernetes.io/metadata.name
        operator: In
        values: ["stakater-crossplane"]
```

</details>

More configuration that can be set while using this webhook can be found [here](https://github.com/jkroepke/helm-charts/tree/main/charts/amazon-eks-pod-identity-webhook)

### Step 9: Annotate Service Accounts

Annotate any service account used by Crossplane AWS providers:

```bash
oc annotate sa <space separated list of service accounts> -n <crossplane namespace> eks.amazonaws.com/role-arn=<ARN of the role that we have specified as permission in step 5>
```

### Step 10: Confirm Token Injection

Describe a provider pod and look for the projected volume:

```bash
oc describe pod <provider-pod-name> -n <crossplane namespace>
```

You should see a volume at: `/var/run/secrets/eks.amazonaws.com/serviceaccount`

### Step 11: Create Crossplane ProviderConfig

Finally, point Crossplane at your new role via WebIdentity:

```yaml
apiVersion: aws.upbound.io/v1beta1
kind: ProviderConfig
metadata:
  name: aws-webidentity-config
spec:
  credentials:
    source: WebIdentity
    webIdentity:
      roleARN: <ARN of the role that we have specified as permission in step 5>
```

Apply it:

```bash
oc apply -f providerconfig.yaml
```
