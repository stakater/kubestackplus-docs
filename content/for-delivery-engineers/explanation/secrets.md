# Pipeline Secrets

SAAP Pipelines requires secrets for CI/CD workflow. Following are the secrets used, along with their usage details.

## nexus-helm-auth

**Purpose:** nexus-helm-auth secret is used in CI pipeline to push and pull helm charts from private nexus registry hosted on the cluster. This secret contains credentials for a machine-user to login into the registry.

**Owner:** Stakater

**Type:** Service Account (Shared user)

**User for:** CI pipelines

**Do not use for:** Logging in to registry from your local machine

**Creation:** This secret is created at the time Nexus is set up. It is hard-coded in `nexus-pre-install` configMap, and created through `nexus-setup` job.

**Rotation:** This secret needs to be added to Vault, which is then reconciled by External Secrets Operator, and a Kubernetes secret is created in cluster against it.

**Stored in:** Keeper

## nexus-docker-config

**Purpose:** nexus-docker-config secret is used in CI pipeline to push and pull container images from private nexus registry hosted on the cluster. This secret contains credentials for a machine-user to login into the registry.

**Owner:** Stakater

**Type:** Service Account (Shared user)

**User for:** CI pipelines

**Do not use for:** Logging in to registry from your local machine

**Creation:** This secret is created at the time Nexus is set up. It is hard-coded in `nexus-pre-install` configMap, and created through `nexus-setup` job.

**Rotation:** This secret needs to be added to Vault, which is then reconciled by External Secrets Operator, and a Kubernetes secret is created in cluster against it.

**Stored in:** Keeper

**Sample Secret**:

```yaml
kind: Secret
apiVersion: v1
metadata:
  name: nexus-docker-config
  namespace: <namespace>
immutable: false
data:
  .dockerconfigjson: >-
    <Base64 encoded value>
  config: >-
    <Base64 encoded value>
type: kubernetes.io/dockerconfigjson
```

Sample .dockerconfigjson:
```json
{
    "auths": {
      "https://nexus-docker-stakater-nexus.jlvwjls8.kubeapp.cloud": {
        "auth": <base64 value of [user:password]>
      },
      "https://nexus-docker-proxy-stakater-nexus.apps.jlvwjls8.kubeapp.cloud": {
        "auth": <base64 value of [user:password]>
      }
    }
  }
```

## git-auth

**Purpose:** git-auth secret is used in CI pipeline. It's purpose is to clone git repositories into workspaces that are used in pipeline steps to perform any defined action. The secret contains a token that has access to defined user and repository permission (fine-grained token).

**Owner:** Stakater

**Type:** Service Account (Shared user)

**User for:** CI pipelines

**Do not use for:** Logging in to registry from your local machine

**Creation:** This secret is created by GitHub organization admin. More details on how to create this can be seen [here](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)

**Rotation:** This secret needs to be added to Vault, which is then reconciled by External Secrets Operator, and a Kubernetes secret is created in cluster against it.

**Stored in:** Keeper
