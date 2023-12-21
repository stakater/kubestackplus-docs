# Adding External Secret
  
  Since we want the `git-pat-creds` secret to be deployed in all of the tenant namespaces, we will use a multi-tenant-operator template to deploy it.
  
  1. Open up the `infra-gitops-config` repository that we have already bootstrapped.
  
  1. Open the `tenant-operator-config` folder and create a `templates` folder inside it.
  
  <div style="text-align:center"><img src="images/template.png" /></div>
  
  1. Now create a file named `git-pat-creds-template.yaml` and add the following content.
  
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
  
  1. Create another file named `git-pat-creds-tgi.yaml` and add the below content.
  
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
  
  1. Lets see our Template and TGI in ArgoCD. Open up ArgoCD and look for `tenant-operator-config` application. You should be able to see your Template and TGI deployed.
  
  <div style="text-align:center"><img src="images/tgi-and-template.png" /></div>
