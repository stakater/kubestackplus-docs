# Secrets

[TOC]

We will need the following secrets for running a fully functional pipeline using pipeline-as-code.
To have a fully functional pipeline, we will be needing a few secrets. Some of the secrets are Auto-distributed in the build namespaces of all tenants. While the rest will be deployed through your infra repository (organization level secrets) and GitOps repository (repository/application level secrets)

## Auto Generated Secrets

<TODO: Describe how each one is auto-generated>

* `sonar-creds`
    * _Purpose_: Used by `sonarqube-scan` pipeline task
    * _Owner_: SAAP admins
    * _Type_: Login credentials for SonarQube
    * _Used for_: For running SonarQube scan in pipeline
    * _Lifecycle_: Every time a new tenant is created, the secret gets deployed in the build namespace. SonarQube credentials are not rotated and remain the same.
    * _Comment_: The origin of this secret is the SonarQube namespace. Secret is copied over to build namespace using an MTO template and Template Group Instance.
* `docker-reg-creds`
    * _Purpose_: Used by buildah and the application itself to pull the image from the nexus registry
    * _Owner_: SAAP admins
    * _Type_: Login credentials for nexus docker registry. The secret itself is of type dockerconfigjson.
    * _Used for_: Pulling images from the nexus registry. Needs to be deployed in all namespaces of the tenant. We distribute it using a TGI.
    * _Lifecycle_: Every time a new tenant is created, the secret gets deployed in all its namespaces.
* `helm-reg-creds`
    * _Purpose_: Used to pull and push charts from the Nexus Helm Registry. We use it in two places for our pipeline:
        1. `stakater-helm-push` task
        1. ArgoCD to fetch the helm chart
    * _Owner_: SAAP Admins
    * _Used for_: Pulling Charts from Nexus
    * _Lifecycle_: Every time a new tenant is created, the secret gets deployed in the build namespace. The same secret is deployed in the `rh-openshift-gitops-instance` when SAAP is provisioned.
* `rox-creds`
    * _Purpose_: Used by three Tekton Tasks:
        1. `stakater-rox-deployment-check`
        1. `stakater-rox-image-check`
        1. `stakater-rox-image-scan`
    * _Owner_: SAAP admins
    * _Used for_: Communicating with RHACS API to scan images and deployments
    * _Lifecycle_: Created at the time of RHACS deployment. The secret is then copied over to build namespaces of tenants.
    * _Comment_: Needs to be deployed in build namespace. We deploy it using TGI.

## Infra GitOps Creds

* `infra-gitops-creds`
    * _Purpose_: This secret is added so ArgoCD can sync the repository. You can either use an ssh key or a personal access token for this purpose.
    * _Owner_: The owner of this secret will be customer's delivery engineer
    * _Location_: The secret will be deployed in the `rh-openshift-gitops-instance` namespace
    * _Used for_: Use only for the purpose of syncing your infra GitOps repository with ArgoCD
    * _Format_: Given below is the template for this secret. The secret/external secret will need to have `argocd.argoproj.io/secret-type: repository` label on it:

         ```yaml
         apiVersion: v1
         kind: Secret
         metadata:
         name: private-repo
         namespace: argocd
         labels:
            argocd.argoproj.io/secret-type: repository
         stringData:
         type: git
         url: git@github.com:argoproj/my-private-repository
         sshPrivateKey: |
            -----BEGIN OPENSSH PRIVATE KEY-----
            ...
            -----END OPENSSH PRIVATE KEY-----
         ```

    * _Comment_: This secret needs to be deployed on the cluster directly.

## Organization Level Secrets

!!! note
    These secrets need to go into your Infra GitOps Repository

* `apps-gitops-creds`
    * _Purpose_: This secret is added so ArgoCD can sync the `apps-gitops` repository. You can either use an ssh key or a personal access token for this purpose.
    * _Owner_: The owner of this secret will be customer's delivery engineer
    * _Location_: The secret will be deployed in the `rh-openshift-gitops-instance` namespace **through the `infra-gitops` repository**
    * _Format_: Will have the same format as that of `infra-gitops-creds` secret
    * _Use for_: Syncing apps GitOps repository
    * _Comment_: Once you have the both the repositories bootstrapped with ArgoCD, the first thing we will need to do for our pipelines to function is to connect pipeline-as-code to our applications repository. We do this using a Repository CR. The Repository CR references a couple of secrets to connect with the application's repository in the SCM.
* `git-pat-creds`
    * _Purpose_: Used for three reasons:
        1. In the Repository CR so pipeline-as-code can talk to the repository
        1. In create-environment task to get commit hashes
        1. In TronadorConfig to allow Tronador to access the application repository
    * _Owner_: The owner of this secret will be customer's delivery engineer
    * _Location_: This secret will be deployed in build namespace of all tenants, the namespaces created by Tronador.
* `[app-name]-ssh-creds`
    * _Purpose_: Used by these Tekton tasks:
        * `git-clone`
        * `push-main-tag`
        * `create-git-tag`
        * `update-cd-repo`
    * _Owner_: Customer's delivery engineer
    * _Location_: In build namespace of the tenant through `apps-gitops` repository

## Repository level secrets

* `[app-name]-git-webhook-creds`
    * _Purpose_: Used in the Repository CR. pipeline-as-code needs this to verify the webhook payload set
    * _Owner_: Developer owns this secret
    * _Location_: In build namespace of the tenant through `apps-gitops` repository
