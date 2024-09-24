# Configure apps GitOps repository

Let us set up Stakater Opinionated GitOps Structure.

Stakater's GitOps structure is composed of two repositories; one for deploying infrastructural resources, and one for deploying the application workloads.

For the purpose of this tutorial, we will be using the name `infra-gitops-config` for the former repository and `apps-gitops-config` for the latter.
You can name these two repositories anything you want but make sure the names are descriptive.

Objective:
Define ArgoCD apps structure

Key Results:

- Create Apps GitOps repository
- Define and configure the AppOfApps structure

## Apps GitOps Config

This repository is the single source of truth for declarative workloads to be deployed on cluster. It separates workloads per tenant.

To make things easier, we have created a [template](https://github.com/stakater-lab/apps-gitops-config.git) that you can use to create your apps repository.

### Hierarchy

Tenant (Product) owns Applications which are promoted to different Environments on different clusters.

Cluster >> Tenants (teams/products) >> Applications >> Environments (distributed among Clusters)

A cluster can hold multiple tenants; and each tenant can hold multiple applications; and each application be deployed into multiple environments.

This GitOps structure supports:

- Multiple clusters
- Multiple tenants/teams/products
- Multiple apps
- Multiple environments (both static and dynamic)

### Create the repository

1. Open up your SCM and create any empty repository named `apps-gitops-config`.

> Follow along GitHub/GitLab documentation for configuring other organization specific requirements set for source code repositories.

1. Create a secret with read permissions over this repository. Navigate to following section for more info [Configure Repository Secret for ArgoCD](../../how-to-guides/configure-repository-secret/configure-repository-secret.md). We'll use this secret later in [Linking Apps GitOps with Infra GitOps](#linking-apps-gitops-with-infra-gitops).

### Add a tenant

Lets proceed by adding a tenant to the `apps-gitops-config` repository.

1. Create a folder at root level for your tenant. Lets use `arsenal` as tenant name which was deployed in the previous section via `infra-gitops-config` repository.

      ```bash
      ├── arsenal
      ```

    Inside this folder we can define multiple applications per tenant.

1. We need to create a `argocd-apps` folder inside this `arsenal` folder. This folder will deploy the applications defined inside its siblings folders (in `arsenal` folder).

      ```bash
      ├── arsenal
          └── argocd-apps
      ```

1. Lets add an application for tenant `arsenal`, Lets call this application `stakater-nordmart-review`. Create a folder named `stakater-nordmart-review` in `arsenal` folder.

      ```bash
      ├── arsenal
          └── stakater-nordmart-review
      ```

    This application has two environments: dev and stage. Former is deployed to dev cluster and latter is deployed to stage cluster.
    We need to create two new folders now:

      ```bash
      ├── arsenal
          └── stakater-nordmart-review
              ├── dev
              └── stage
      ```

    We need the corresponding folders inside `argocd-apps` folder and define ArgoCD applications pointing to these folders.

      ```bash
      ├── arsenal
          ├── argocd-apps
             ├── dev
             │   └── stakater-nordmart-review-dev.yaml
             └── stage
                 └── stakater-nordmart-review-stage.yaml
      ```

    Create an ArgoCD application inside dev folder that points to dev directory in `stakater-nordmart-review`. Create a file named `APP_NAME.yaml` with following spec:

      ```yaml
      # Name: stakater-nordmart-review.yaml(APP_NAME.yaml)
      # Path: arsenal/argocd-apps/dev (TENANT_NAME/argocd-apps/ENV_NAME/)
      apiVersion: argoproj.io/v1alpha1
      kind: Application
      metadata:
        name: arsenal-dev-stakater-nordmart-review
        namespace: rh-openshift-gitops-instance
      spec:
        destination:
          namespace: TARGET_NAMESPACE_FOR_DEV
          server: 'https://kubernetes.default.svc'
        project: arsenal
        source:
          path: arsenal/stakater-nordmart-review/dev
          repoURL: 'APPS_GITOPS_REPO_URL'
          targetRevision: HEAD
        syncPolicy:
          automated:
            prune: true
            selfHeal: true
      ```

    Similarly create another ArgoCD application inside stage folder that points to stage directory in `stakater-nordmart-review`.

      ```yaml
      # Name: stakater-nordmart-review.yaml (APP_NAME.yaml)
      # Path: arsenal/argocd-apps/stage (TENANT_NAME/argocd-apps/ENV_NAME/)
      apiVersion: argoproj.io/v1alpha1
      kind: Application
      metadata:
        name: arsenal-stage-stakater-nordmart-review
        namespace: rh-openshift-gitops-instance
      spec:
        destination:
          namespace: TARGET_NAMESPACE_FOR_STAGE
          server: 'https://kubernetes.default.svc'
        project: arsenal
        source:
          path: arsenal/stakater-nordmart-review/stage
          repoURL: 'APPS_GITOPS_REPO_URL'
          targetRevision: HEAD
        syncPolicy:
          automated:
            prune: true
            selfHeal: true
      ```

      > Find the template file [here](https://github.com/stakater-lab/apps-gitops-config/blob/main/01-TENANT_NAME/00-argocd-apps/APP_NAME-ENV_NAME.yamlSample)

      After performing all the steps you should have the following folder structure:

      ```bash
      ├── arsenal
          ├── argocd-apps
             ├── dev
             │   └── stakater-nordmart-review-dev.yaml
             └── stage
                 └── stakater-nordmart-review-stage.yaml
          └── stakater-nordmart-review
              ├── dev
              └── stage
      ```

1. Create `argocd-apps` folder at the root of your Apps GitOps repo. Create clusters folder containing the environments folder each cluster have. Add ArgoCD applications for these environments (dev & stage).

      ```bash
      ├── argocd-apps
          ├── cluster-1
              ├── dev
              └── stage
          ├── cluster-2
              ├── dev
              └── stage
      ```

    > Folders in `argocd-apps` corresponds to clusters, these folders contain ArgoCD applications pointing to 1 or more environments inside multiple tenant folders per cluster. Folders in `arsenal/argocd-apps` correspond to environments.

    Next, create the following ArgoCD applications in each environment, dev and stage:

      ```yaml
      # Name: arsenal-dev.yaml (TENANT_NAME-ENV_NAME.yaml)
      # Path: argocd-apps/dev
      apiVersion: argoproj.io/v1alpha1
      kind: Application
      metadata:
        name:
        namespace: rh-openshift-gitops-instance
      spec:
        destination:
          namespace: TARGET_NAMESPACE_FOR_DEV
          server: 'https://kubernetes.default.svc'
        project: arsenal
        source:
          path: argocd-apps/dev
          repoURL: 'APPS_GITOPS_REPO_URL'
          targetRevision: HEAD
        syncPolicy:
          automated:
            prune: true
            selfHeal: true
      ---
      # Name: arsenal-stage.yaml (TENANT_NAME-ENV_NAME.yaml)
      # Path: argocd-apps/stage
      apiVersion: argoproj.io/v1alpha1
      kind: Application
      metadata:
        name: arsenal-stage
        namespace: rh-openshift-gitops-instance
      spec:
        destination:
          namespace: TARGET_NAMESPACE_FOR_STAGE
          server: 'https://kubernetes.default.svc'
        project: arsenal
        source:
          path: argocd-apps/stage
          repoURL: 'APPS_GITOPS_REPO_URL'
          targetRevision: HEAD
        syncPolicy:
          automated:
            prune: true
            selfHeal: true
      ```

      > Find the template file [here](https://github.com/stakater-lab/apps-gitops-config/blob/main/00-argocd-apps/CLUSTER_NAME/TENANT_NAME-ENV_NAME.yamlSample)

## Linking Apps GitOps with Infra GitOps

1. We need to create ArgoCD applications that will deploy the apps of apps structure defined in our `apps-gitops-config` repository.

1. Suppose we want to deploy our application workloads of our dev (CLUSTER_NAME) cluster. We can create an ArgoCD application for `apps-gitops-config` repository pointing to `argocd-apps/dev (argocd-apps/CLUSTER_NAME)` inside `cluster/argocd-apps/` folder in `infra-gitops-config` repository.

    ```yaml
      apiVersion: argoproj.io/v1alpha1
      kind: Application
      metadata:
        name: apps-gitops-config
        namespace: rh-openshift-gitops-instance
      spec:
        destination:
          namespace: rh-openshift-gitops-instance
          server: 'https://kubernetes.default.svc'
        project: root-tenant
        source:
          path: argocd-apps/dev
          repoURL: 'APPS_GITOPS_REPO_URL'
          targetRevision: HEAD
        syncPolicy:
          automated:
            prune: true
            selfHeal: true
    ```

    > Find the template file [here](https://github.com/NordMart/infra-gitops-config/blob/main/cluster-name/argocd-apps/apps-gitops-config.yaml)

1. We need to add this resource inside `argocd-apps` folder in `dev/argocd-apps (CLUSTER_NAME/argocd-apps)`.

    ```bash
      ├── dev
          └── argocd-apps
              └── apps-gitops-config.yaml
    ```

1. Now lets add the secret required by ArgoCD for reading `apps-gitops-config` repository. Lets add a folder called `gitops-repositories` at `cluster/`. This will contain secrets required by ArgoCD for authentication over repositories.

    ```bash
      ├── dev
          ├── argocd-apps
          |   └── apps-gitops-config.yaml
          └── gitops-repositories
    ```

1. Add an external secret custom resource in `cluster/gitops-repositories/apps-gitops-creds.yaml` folder. We have already stored the secret value in Vault. Use the following template :

     ```yaml
       apiVersion: external-secrets.io/v1beta1
       kind: ExternalSecret
       metadata:
         name: apps-gitops-creds
         namespace: rh-openshift-gitops-instance
       spec:
         refreshInterval: 1m0s
         secretStoreRef:
           name: tenant-vault-shared-secret-store
           kind: SecretStore
         data:
         - remoteRef:
             key: git-pat-creds
             property: username
           secretKey: username
         - remoteRef:
             key: git-pat-creds
             property: password
           secretKey: password
         target:
           name: apps-gitops-creds
           template:
             metadata:
               labels:
                 argocd.argoproj.io/secret-type: repository
             data:
               name: apps-gitops-creds
               password: "{{ .password | toString }}"
               username: "{{ .username | toString }}"
               project: TENANT_NAME
               type: git
               url: "https://github.com/DESTINATION_ORG/apps-gitops-config.git"
     ```

1. Add an ArgoCD application pointing to this directory `dev/gitops-repositories/` inside `dev/argocd-apps/gitops-repositories.yaml`.

    ```yaml
      apiVersion: argoproj.io/v1alpha1
      kind: Application
      metadata:
         name: gitops-repositories
         namespace: rh-openshift-gitops-instance
         finalizers:
         - resources-finalizer.argocd.argoproj.io
      spec:
        destination:
         server: 'https://kubernetes.default.svc'
      source:
        path: cluster-name/gitops-repositories
        repoURL: 'https://github.com/DESTINATION_ORG/infra-gitops-config.git'
        targetRevision: main
        directory:
          recurse: true
      project: default
      syncPolicy:
        automated:
          prune: true
          selfHeal: true
    ```

     ```bash
     ├── dev
         ├── argocd-apps
         |   ├── gitops-repositories.yaml
         |   └── apps-gitops-config.yaml
         └── gitops-repositories
             └── apps-gitops-creds.yaml
     ```

1. Login to ArgoCD and check if the secret is deployed by opening `argocd-secrets` application in `infra-gitops-config` application.

## View Apps-of-Apps structure on ArgoCD

1. Login to ArgoCD and view `apps-gitops-config` application and explore the `apps-of-apps` structure.

The below image represents the complete look of the ArgoCD application when the Infra and Apps repos are linked successfully with all the pre-requisites accomplished.

  ![`ArgoCD-Infra-repo-App`](../images/ArgoCD-Infra-repo-App.png)
