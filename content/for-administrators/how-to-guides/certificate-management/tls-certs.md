# Configuring Cert Manager Issuer and External DNS

This document provides a step-by-step guide to configure Cert Manager Issuer and External DNS for different tenants.

## Step 1: Setup DNS creds in Vault

Go to `common-shared-secret` path in Vault and create a secret `external-dns-creds`. This secret mainly have credentials for authenticating with DNS provider and should contain following fields:

### Cloudflare

- `api-token (required)`: API token generated from DNS provider being used. In case of Cloudflare, it should have `DNS:Edit` and `Zone:Read` access.
- `domain-filter (optional)`: This field should contain base domain that becomes base for registering further subdomains. For example: `example.com`.
- `zone-id-filter (optional)`: In case of Cloudflare, if you want to give more restrictive access of only few zones to this token, then this field should contain these zone ids.

## Step 2: Navigate to the Target Path

Navigate to the appropriate path in your Infra GitOps repository. For this example, the path is:

```plaintext
<cluster>/tenant-operator-config/templates/
```

## Step 3: Create Required Resources

In this directory, create the following resources:

- [`Template`](https://docs.stakater.com/mto/main/crds-api-reference/template.html)
- [`TemplateGroupInstance`](https://docs.stakater.com/mto/main/crds-api-reference/template-group-instance.html)

### Template

The `Template` resource defines the underlying YAML files to be deployed to tenant namespaces. Below is an example template for setting up a TLS certificate:

#### Cloudflare

```yaml
apiVersion: tenantoperator.stakater.com/v1alpha1
kind: Template
metadata:
  name: certificate-creds
resources:
  manifests:
    - apiVersion: external-secrets.io/v1beta1
      kind: ExternalSecret
      metadata:
        name: certificate-creds
      spec:
        secretStoreRef:
          kind: ClusterSecretStore
          name: shared-cluster-secret-store
        refreshInterval: "1m0s"
        target:
          name: certificate-creds
          creationPolicy: 'Owner'
        template:
          data:
            api-token: "{{ .api-token | b64enc }}"
        data:
        - secretKey: api-token
          remoteRef:
            key: certificate-creds
            property: api-token
    - apiVersion: cert-manager.io/v1
      kind: Issuer
      metadata:
        name: letsencrypt-cloudflare
      spec:
        acme:
          email: <domain-owning-authority's email>
          server: https://acme-v02.api.letsencrypt.org/directory
          privateKeySecretRef:
            name: letsencrypt-account-key
          solvers:
            - dns01:
                cloudflare:
                  apiTokenSecretRef:
                    name: certificate-creds
                    key: api-token
```

#### Explanation of Resources

1. **`ExternalSecret`**:
   - Retrieves the `api-token` from the secret provider (Vault).
   - The `api-token` authenticates the DNS provider (e.g., Cloudflare) for certificate validation.

1. **`Issuer`**:
   - Configures Cert-Manager to generate TLS certificates using [Let’s Encrypt](https://letsencrypt.org/).
   - Requires:
     - `.spec.acme.email`: Email address for certificate lifecycle updates.
     - `.spec.acme.solvers.dns01.cloudflare.apiTokenSecretRef`: Reference to the `ExternalSecret` created earlier.

### TemplateGroupInstance

The `TemplateGroupInstance` deploys resources by referencing the created templates and specifying target namespaces. Example:

```yaml
apiVersion: tenantoperator.stakater.com/v1alpha1
kind: TemplateGroupInstance
metadata:
  name: certificate-creds
spec:
  template: certificate-creds
  selector:
    matchExpressions:
      - key: stakater.com/kind
        operator: In
        values: [sandbox, dev]
  sync: true
```

#### Key Fields

- **`.spec.template`**: References the `Template` resource.
- **`.spec.selector`**: Specifies namespaces to deploy resources based on label expressions.
    - In this example, resources are deployed to tenant namespaces with the label `stakater.com/kind` having values `sandbox` or `dev`.

Commit, push, and merge these changes to the `main` branch. ArgoCD will deploy the resources to the specified namespaces within a few minutes.

### Verify Deployment

1. In the cluster console, switch to `Administrator` view and navigate to `Home > Search`.
1. Select the namespace and search for `Issuer` in the `Resources` dropdown.
1. Inspect the deployed issuer. In the `Condition` section, confirm that the issuer is up-to-date.

![OpenShift Console](images/console.png)

![Issuer Details](images/issuer-status.png)
