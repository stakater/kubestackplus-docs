# Custom Domains

Consider have a domain `custom.domain.com`; and you want to host your application on your own domain instead of the default route provided by SAAP i.e. `<MYAPP_NAME>-<MYAPP_NAMESPACE>.apps.<CLUSTER_NAME>.<CLUSTER_ID>.kubeapp.cloud`. You can follow these steps in order to use your own domain:

1. Configure DNS
1. Configure TLS Certificates
1. Create Ingress for your Application
1. Verify

## 1. Configure DNS

In order to host your application on `custom.domain.com`. You need to point your DNS address to the ingress endpoint of the cluster's default router. This can either be a public IP or a private IP depending if the cluster is public or private.

See [External DNS](./external-dns.md) section to automatically configure DNS for your applications

### Option # 1: Create Manual entries

#### Step # 1: Obtain Public IP Address

Use the following command to get the ingress IP address of your cluster:

```sh
nslookup "*.apps.$(oc get dns -ojsonpath='{.items[0].spec.baseDomain}')" | grep Address | tail -1
```

#### Step # 2: Create entry in your DNS Provider

Add `A` entry in your DNS provider to point `custom.domain.com` to the IP obtained in the previous step.

## 2. Configure TLS certificate secret

There are two ways to configure TLS Certificate secret:

1. Certmanager Operator
2. Bring Your Own Certificates (BYOC)

### Option # 1: Certmanager Operator

See configuration options for [cert-manager managed addon](../../managed-addons/cert-manager/overview.md)

### Option # 2: Bring Your Own Certificates (BYOC)

Generate TLS certificates of your domain i.e. `custom.domain.com` from your preferred CA and create a secret of the following format (secret can be secured via [SealedSecrets](https://docs.stakater.com/secrets/sealed-secrets.html).

Replace concealed values with the corresponding base64 encoded certificate values.

```yaml
apiVersion: route.openshift.io/v1
kind: Route
metadata:
  name: my-app-route
  namespace: my-apps-ns
spec:
  host: my-app.custom.domain.com
  path: /
  port:
    targetPort: http
  tls:
    certificate: |
        <concealed>
    key: |
        <concealed>
    insecureEdgeTerminationPolicy: Redirect
    termination: edge
  to:
    kind: Service
    name: playbook
    weight: 100
  wildcardPolicy: None
```

## 3. Create for your Application

In you application values add Ingress section as followings:

```yaml
...
ingress:
  enabled: true
  servicePort: <SERVICE_PORT>
  hosts:
  - cusotm.domain.com
  annotations:
    cert-manager.io/cluster-issuer: ca-issuer
  tls:
  - hosts:
      - custom.domain.com
    secretName: custom-domain-tls-cert
...
```

It will take 2-3 min for Certmanager to issue a certificate and upon success, `custom-domain-tls-cert` secret will be populated with the cert values.

## 4. Verify

A Route would be created in you application namespace. Open your route URL i.e `https://custom.domain.com` to view and verify your TLS secured web application
