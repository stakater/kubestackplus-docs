# Secrets

We will need the following secrets for running a fully functional pipeline using pipeline-as-code.
To have a fully functional pipeline, we will be needing a few secrets. Some of the secrets are Auto-distributed in the build namespaces of all tenants. While the rest will be deployed through your infra repository (organization level secrets) and GitOps repository (repository/application level secrets)

## Auto Generated Secrets

* `sonar-creds`
    * _Purpose_: Used by `sonarqube-scan` pipeline task
    * _Owner_: SAAP admins
    * _Type_: Login credentials for SonarQube
    * _Used for_: For running SonarQube scan in pipeline
    * _Lifecycle_: Every time a new tenant is created, the secret gets deployed in the build namespace. SonarQube credentials are not rotated and remain the same.
    * _Comment_: The origin of this secret is the SonarQube namespace. Secret is copied over to build namespace using an MTO template and Template Group Instance.
    * _Deployment Process_: The SonarQube deployed on SAAP contains a secret named `sonar-creds` in its namespace. This secret contains the username and password for SonarQube. We use a Multi Tenant Operator Template and TemplateGroupInstance to copy this secret and distribute it the build namespaces of all tenants. The Template and TemplateGroupInstance are both named `sonar-creds`
* `docker-reg-creds`
    * _Purpose_: Used by buildah and the application itself to pull the image from the nexus registry
    * _Owner_: SAAP admins
    * _Type_: Login credentials for nexus docker registry. The secret itself is of type dockerconfigjson.
    * _Used for_: Pulling images from the nexus registry. Needs to be deployed in all namespaces of the tenant. We distribute it using a TGI.
    * _Lifecycle_: Every time a new tenant is created, the secret gets deployed in all its namespaces.
    * _Deployment Process_: Nexus comes shipped with SAAP. The `nexus3` namespace contains a secret named `docker-reg-creds`. This secret contains the .dockerconfigjson file. We use a Multi Tenant Operator Template and TemplateGroupInstance to copy this secret and distribute it all namespaces of the tenants. The Template and TemplateGroupInstance are both named `docker-reg-creds`

* `helm-reg-creds`
    * _Purpose_: Used to pull and push charts from the Nexus Helm Registry. We use it in two places for our pipeline:
        1. `stakater-helm-push` task
        1. ArgoCD to fetch the helm chart
    * _Owner_: SAAP Admins
    * _Used for_: Pulling Charts from Nexus
    * _Lifecycle_: Every time a new tenant is created, the secret gets deployed in the build namespace. The same secret is deployed in the `rh-openshift-gitops-instance` when SAAP is provisioned.
    * _Deployment Process_: Nexus comes shipped with SAAP. The `nexus3` namespace contains a secret named `helm-reg-creds`. This secret contains the username and password for the helm registry. We use a Multi Tenant Operator Template and TemplateGroupInstance to copy this secret and distribute it all namespaces of the tenants. The Template and TemplateGroupInstance are both named `helm-reg-creds`. Another TGI named `helm-reg-creds-gitops` deploys the secret in GitOps namespace so ArgoCD can fetch the charts.

* `rox-creds`
    * _Purpose_: Used by three Tekton Tasks:
        1. `stakater-rox-deployment-check`
        1. `stakater-rox-image-check`
        1. `stakater-rox-image-scan`
    * _Owner_: SAAP admins
    * _Used for_: Communicating with RHACS API to scan images and deployments
    * _Lifecycle_: Created at the time of RHACS deployment. The secret is then copied over to build namespaces of tenants.
    * _Comment_: Needs to be deployed in build namespace. We deploy it using TGI.
    * _Deployment Process_: After StackRox is installed on the SAAP cluster. An api token is created and stored in the rox-creds secret in the `stakater-stackrox` namespaces. We then use a Template and a TemplateGroupInstance with the same name to distribute the secret in the build namespace of tenants.

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
    * _Purpose_: This secret is added so ArgoC
    * _Used for_: Communicating with RHACS API to scan images and deployments
    * _Lifecycle_: Created at the time of RHACS deployment. The secret is then copied over to build namespaces of tenants.
    * _Comment_: Needs to be deployed in build namespace. We deploy it using TGI.
    * _Deployment Process_: After RD can sync the `apps-gitops-config` repository. You can either use an ssh key or a personal access token for this purpose.
    * _Owner_: The owner of this secret will be customer's delivery engineer
    * _Location_: The secret will be deployed in the `rh-openshift-gitops-instance` namespace **through the `infra-gitops` repository**
    * _Format_: Will have the same format as that of `infra-gitops-creds` secret
    * _Use for_: Syncing apps GitOps repository
    * _Comment_: Once you have the both the repositories bootstrapped with ArgoCD, the first thing we will need to do for our pipelines to function is to connect pipeline-as-code to our applications repository. We do this using a Repository CR. The Repository CR references a couple of secrets to connect with the application's repository in the SCM.
    * _Deployment Process_: To deploy the `apps-gitops-creds`, follow the below-mentioned steps:
        1. Navigate to your `infra-gitops-config` repository.
        1. At the base level, your infra repository should already have a folder with cluster name. You can refer to this tutorial for defining your Infra GitOps Repository structure. Open up the relevant cluster folder.
        1. Inside it, create a folder named `gitops-repositories`.
        1. Now add an external secret that has the following structure. Remember to replace the placeholder.

        ```yaml
          apiVersion: external-secrets.io/v1beta1
          kind: ExternalSecret
          metadata:
            name: apps-gitops-creds
            namespace: rh-openshift-gitops-instance
          spec:
            secretStoreRef:
              name: stakater-cluster-secret-store
              kind: ClusterSecretStore
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

        1. Now open up Vault and open the common-secrets path. Add a secret named git-pat-creds and add two key 'password' and 'username'. Password should have Personal Access Token with that can access your `apps-gitops-config` repository.
        1. Now go to the `argocd-apps` folder in the `infra-gitops-config` repo and add and ArgoCD application pointing to your `gitops-repositories` folder.

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
             repoURL: YOUR_INFRA_REPO_URL
             targetRevision: main
             directory:
               recurse: true
           project: default
           syncPolicy:
             automated:
               prune: true
               selfHeal: true
      ```
  
       1. Wait for ArgoCD to sync your changes.

* `git-pat-creds`
    * _Purpose_: Used for three reasons:
        1. In the Repository CR so pipeline-as-code can talk to the repository
        1. In create-environment task to get commit hashes
        1. In TronadorConfig to allow Tronador to access the application repository
    * _Owner_: The owner of this secret will be customer's delivery engineer
    * _Location_: This secret will be deployed in build namespace of all tenants, the namespaces created by Tronador.\
    * _Deployment Process_: To deploy the git-pat-creds, follow the below-mentioned steps:
          1. Navigate to your `infra-gitops-config` repository.
          1. At the base level, your infra repository should already have a folder with cluster name. Open up the tenant-operator-config and create a folder named templates if it is not already there.
          1. Now add a template with the following structure. Remember to replace the placeholders.

      ```yaml
         apiVersion: tenantoperator.stakater.com/v1alpha1
         kind: Template
         metadata:
           name: git-pat-creds
         resources:
           manifests:
             - apiVersion: external-secrets.io/v1beta1
               kind: ExternalSecret
               metadata:
                 name: git-pat-creds
               spec:
                 dataFrom:
                   - extract:
                     conversionStrategy: Default
                     key: git-pat-creds
                 refreshInterval: 1m0s
                 secretStoreRef:
                   kind: SecretStore
                   name: tenant-vault-shared-secret-store
                 target:
                   name: git-pat-creds
      ```

        1. Now add a TemplateGroupInstance:

        ```yaml
          apiVersion: tenantoperator.stakater.com/v1alpha1
          kind: TemplateGroupInstance
          metadata:
            name: git-pat-creds
          spec:
             template: git-pat-creds
             selector:
               matchExpressions:
                 - key: stakater.com/kind
                   operator: In
                   values: [ build, pr ]
             sync: true
        ```

        1. If you have correctly configured your infra repository, ArgoCD should be able to sync the changes and deploy the secret in build namespaces of the tenants.

## Repository level secrets

* `[app-name]-ssh-creds`
    * _Purpose_: Used by these Tekton tasks:
        * `git-clone`
        * `push-main-tag`
        * `create-git-tag`
        * `update-cd-repo`
    * _Owner_: Customer's delivery engineer
    * _Location_: In build namespace of the tenant through `apps-gitops` repository
    * _Deployment Process_: To deploy the git-pat-creds, follow the below-mentioned steps:
        1. Navigate to your `apps-gitops-config` repository
        1. Open up the tenant for which you want to deploy this secret.
        1. Now navigate to the folder which bears the name of the application for which you want to run the pipelines.
        1. Open the build folder.
        1. Add an external secret named [app-name]-ssh-creds.

        ```yaml
          apiVersion: external-secrets.io/v1beta1
          kind: ExternalSecret
          metadata:
            name: [app-name]-ssh-creds
          spec:
            secretStoreRef:
              name: tenant-vault-secret-store
              kind: SecretStore
            refreshInterval: "1m0s"
            target:
              name: [app-name]-ssh-creds
              creationPolicy: 'Owner'
              template:
                data:
                  id_rsa: "{{ .id_rsa | b64dec | toString }}"
            data:
              - secretKey: id_rsa
                remoteRef:
                  key: [app-name]-ssh-creds
                  property: api_private_key
       ```

        1. Now open up the tenant path in Vault and add a secret named [app-name]-ssh-creds. Add a key api_private_key. The value should have a private ssh key that has access to your application repository as well as you `apps-gitops-config` repository.
        1. Assuming you have already set up the `apps-gitops-config` repository, you should be able to see the secret deployed to your tenant's build namespace.

* `[app-name]-git-webhook-creds`
    * _Purpose_: Used in the Repository CR. pipeline-as-code needs this to verify the webhook payload set
    * _Owner_: Developer owns this secret
    * _Location_: In build namespace of the tenant through `apps-gitops` repository
    * _Deployment Process_: Follow the below-mentioned steps for deploying the secret:
        1. Navigate to your `apps-gitops-config` repository
        1. Open up the tenant for which you want to deploy this secret.
        1. Now navigate to the folder which bears the name of the application for which you want to run the pipelines.
        1. Open the build folder.
        1. Add an external secret named [app-name]-git-webhook-creds

        ```yaml
           apiVersion: external-secrets.io/v1beta1
           kind: ExternalSecret
           metadata:
             name: github-webhook-config
           spec:
             secretStoreRef:
               name: tenant-vault-secret-store
               kind: SecretStore
             refreshInterval: "1m0s"
             target:
               name: github-webhook-config
               creationPolicy: 'Owner'
               template:
                 data:
                   provider.token: "{{ .password | toString }}"
                   webhook.secret: "{{ .secret | toString }}"
             data:
               - secretKey: password
                 remoteRef:
                   key: github-webhook-config
                   property: provider.token
               - secretKey: secret
                 remoteRef:
                   key: github-webhook-config
                   property: webhook.secret
        ```
