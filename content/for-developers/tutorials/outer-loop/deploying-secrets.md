# Secrets

We will need the following secrets for running a fully functional pipeline using pipeline as code.
To have a fully functional pipeline, we will be needing a few secrets. Some of the secrets are Auto-distributed in the build namespaces of all tenants. While the rest will be deployed through your infra repository (organization level secrets) and gitops repository (repository/application level secrets)

## Auto Generated Secrets

### sonar-creds

**Purpose:** Used by sonarqube-scan pipeline task.

**Owner:** SAAP admins.

**Type:** Login credentials for sonarqube. 

**Use for:** For running sonarqube scan in pipeline

**Lifecycle:** Every time a new tenant is created, the secret gets deployed in the build namespace. Sonarqube credentials are not rotated and remain the same.

**Misc:** The origin of this secret is the sonarqube namespace. Secret is copied over to build namespace using a MTO template and Template Group Instance.

### docker-reg-creds

**Purpose** Used by buildah and the application itself to pull the image from the nexus registry

**Owner** SAAP admins

**Type:** Login credentials for nexus docker registry. The secret itself is of type dockerconfigjson

**Use for** Pulling images from the nexus registry. Needs to be deployed in all namespaces of the tenant. We distribute it using a TGI

**Lifecycle:** Every time a new tenant is created, the secret gets deployed in all its namespaces.

### helm-reg-creds

**Purpose** Used to pull and push charts from the Nexus Helm Registry. We use it in two places for our pipeline:
    1. stakater-helm-push task
    1. ArgoCD to fetch the helm chart

**Owner** SAAP Admins

**Use for** Pulling Charts from Nexus.

**Lifecycle:** Every time a new tenant is created, the secret gets deployed in the build namespace. The same secret is deployed in the rh-openshift-gitops-instance when SAAP is provisioned.

### rox-creds

**Purpose** Used by three Tekton Tasks:
     1. stakater-rox-deployment-check
     1. stakater-rox-image-check
     1. stakater-rox-image-scan

**Owner** SAAP admins

**Use for** Talking to RHACS api to scan images and deployments

**Lifecycle** Created at the time of RHACS deployment. The secret is then copied over to build namespaces of tenants.

**Misc** Needs to be deployed in build namespace. We deploy it using TGI

## INFRA GITOPS CREDS

This secret needs to deployed on the cluster directly.

### infra-gitops-creds:
**Purpose** This secret is added so ArgoCD can sync the repository. You can either use an ssh key or a personal access token for this purpose.

**Owner?** The owner of this secret will be customer's delivery engineer

**Where to find it** The secret will be deployed in the rh-openshift-gitops-instance namespace

**Use for** Use only for the purpose of syncing your infra gitops repository with ArgoCD.

**Format** Given below is the template for this secret. The secret/external secret will need to have `argocd.argoproj.io/secret-type: repository` label on it. 
    
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
## Organization Level Secrets

These secrets need to go into your Infra Gitops Repository

### apps-gitops-creds

**Purpose** This secret is added so ArgoCD can sync the apps-gitops repository. You can either use an ssh key or a personal access token for this purpose.

**Where to find it** The secret will be deployed in the rh-openshift-gitops-instance namespace **through the infra-gitops repository**.

**Owner** The owner of this secret will be customer's delivery engineer

**Format** Will have the same format as that of infra-gitops-creds secret

**Use for** Syncing apps gitops repository

Once you have the both the repositories bootstrapped with ArgoCD, the first thing we will need to do for our pipelines to function is to connect Pipeline as Code to our applications repository. We do this using a Repository CR. The Repository CR references a couple of secrets to connect with the application's repository in the SCM. 
### git-pat-creds

**Purpose?** Used for three reasons:
    1. In the Repository CR so Pipeline as Code can talk to the repository
    2. In create-environment task to get commit hashes
    3. In TronadorConfig to allow Tronador to access the application repository.

**Owner** The owner of this secret will be customer's delivery engineer

**Where to find it** This secret will be deployed in build namespace of all tenants, the namespaces created by Tronador. 

1. <app-name>-ssh-creds

**Purpose** Used by multiple tekton tasks:
   1. git-clone
   1. push-main-tag
   1. create-git-tag
   1. update-cd-repo

**Where to find it** In build namespace of the tenant through apps-gitops repository.

**Owner** Customer's delivery engineer.

## Repository level secrets
### <app-name>-git-webhook-creds

**Purpose** Used in the Repository CR. Pipeline as Code needs this to verify the webhook payload set

**Owner** Developer owns this secret.

**Where to find it** In build namespace of the tenant through apps-gitops repository
