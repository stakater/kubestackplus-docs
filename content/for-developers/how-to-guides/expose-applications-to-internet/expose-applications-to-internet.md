# Exposing Your Application to Internet over https and custom hostname

This guide provides a step-by-step process to configure an OpenShift `Route` resource to expose your application to the internet.

## Prerequisites

Before proceeding, ensure the following prerequisites are met:

- **Cert Manager Certificate**: Verify with your cluster administrator that cert manager `Certificate` is properly configured.
- **External DNS**: Confirm that External DNS is set up and operational for managing DNS records.

## Step 1: Deploy the Route

A [`Route`](https://docs.openshift.com/container-platform/4.17/networking/routes/route-configuration.html) resource is used to expose your application to the internet using a specific host name. Follow the steps below to configure the Route.

### Update `values.yaml`

Update the `values.yaml` file in your application’s Helm chart with the following configuration:

```yaml
application:
  ...
  route:
    enabled: true
    annotations:
      cert-utils-operator.redhat-cop.io/certs-from-secret: <name-of-certificate-secret>
      external-dns.alpha.kubernetes.io/hostname: <desired-host-name>
      cert-utils-operator.redhat-cop.io/inject-CA: "false"
    host: <desired-host-name>
    path: <desired-path>
```

#### Important Details

- **Annotations**:
    - `cert-utils-operator.redhat-cop.io/certs-from-secret`: Specifies the name of the secret that stores the TLS certificate created by the Certificate resource.
    - `external-dns.alpha.kubernetes.io/hostname`: Registers the DNS record with the configured provider (e.g., Cloudflare).
    - `cert-utils-operator.redhat-cop.io/inject-CA`: Indicates whether to inject the Certificate Authority (CA) into the Route. Set to "false" if not required.

- **Additional Configuration**:
    - `route.host`: Specifies the host name that you want to use for this route. This value must match the `external-dns.alpha.kubernetes.io/hostname` annotation.
    - `route.path`:  Specifies the URL path where your application will be exposed (e.g., `/api`).

### Validation

After updating the `values.yaml` file and applying the Helm chart, verify the deployment:

#### Route

1. Navigate to the OpenShift cluster console.
1. Go to Networking > Routes and locate the Route resource for your application.
1. Confirm that:
    - The Route resource is listed.
    - Its status is Accepted.
    - The DNS name and TLS configuration are correct.
