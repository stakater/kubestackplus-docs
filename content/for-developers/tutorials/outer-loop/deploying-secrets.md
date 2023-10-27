# Deploying Required Secrets



Application and Gitops repository specific secrets.

1. gitops-repo-ssh-creds
1. application-pat-creds
1. application-ssh-creds
1. git-auth-creds

# Secrets

We will need the following secrets for running a fully functional pipeline using pipeline as code.

1. infra-gitops-creds:
    **Why?** This secret is added so ArgoCD can sync the repository. You can either use an ssh key or a personal access token for this purpose. 
    **Where?** The secret will be deployed in the rh-openshift-gitops-instance namespace
    **Who?** The owner of this secret will be customer's delivery engineer
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
   
1. apps-gitops-creds

   **Why?** This secret is added so ArgoCD can sync the apps-gitops repository. You can either use an ssh key or a personal access token for this purpose.
   **Where?** The secret will be deployed in the rh-openshift-gitops-instance namespace **through the infra-gitops repository**.
   **Who?** The owner of this secret will be customer's delivery engineer
   **Format** Will have the same format as that of infra-gitops-creds secret

Once you have the both the repositories bootstrapped with ArgoCD, the first thing we will need to do for our pipelines to function is to connect Pipeline as Code to our applications repository. We do this using a Repository CR. The Repository CR references a couple of secreta to connect with the application's repository in the SCM. 
1. git-pat-creds 

    **Why?** Used for three reasons:
    1. In the Repository CR so Pipeline as Code can talk to the repository
    2. In create-environment task to get commit hashes
    3. In TronadorConfig to allow Tronador to access the application repository.
    **Where** This secret will be deployed in build namespace of all tenants, the namespaces created by Tronador.
    **Who?** The owner of this secret will be customer's delivery engineer
1. <app-name>-git-webhook-creds
    **Why** Used in the Repository CR. Pipeline as Code needs this to verify the webhook payload set
    **Where** In build namespace of the tenant through apps-gitops repository
    **Who** Developer owns this secret.

1. <app-name>-ssh-creds
   **Why** Used by multiple tekton tasks:
    git-clone
    push-main-tag
    create-git-tag 
    update-cd-repo
   **Where** In build namespace of the tenant through apps-gitops repository.
   **Who** Developer owns it


Auto-distributed secrets

We will need a few secrets to get our pipelines working. Here is a list of secrets that will need to be present in the namespace in which your pipeline will run:

1. sonar-creds
      **Why** Used by sonarqube-scan pipeline task
      **Where** In build namespace of the tenant through apps-gitops repository.
      **Who** SAAP admins

1. docker-reg-creds
   **Why** Used by buildah and the application itself to pull the image from the nexus registry
    
   **Where** Needs to be deployed in all of the tenants namespace. We distribute it using a TGI
   **Who** SAAP admins
1. helm-reg-creds
   **Why** Used by:
   1. stakater-helm-push
   2. ArgoCD to fetch the helm chart 

   **Where** Needs to be deployed in build namespace and rh-openshift-gitops-instance namespace. We deploy it using TGI
   **Who** SAAP admins
1. rox-creds

   **Why** Used by:
    1. 
    2. stakater-rox-deployment-check
       stakater-rox-image-check
       stakater-rox-image-scan

   **Where** Needs to be deployed in build namespace. We deploy it using TGI
   **Who** SAAP admins


Infra gitops (org level)
Apps gitops (repo level)
SAAP distributed (SAAP specific)