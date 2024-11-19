# Add environment

Lets see how can we add an environment to an application in a tenant. Lets say, we have added a production cluster and want to add a new environment in application for it to be deployed on production.

1. Create a folder named `<cluste<apps-gitops-repo-url>r-name>` at `<tenant-name>/<app-name>` which corresponds to the production environment. Suppose `<tenant-name>` as tenant name, `<app-name>` as application name, `<cluster-name>` as cluster name, `<env-name>` as environment name.
  
    ```bash
    └── <tenant-name>
        └── <app-name>
            └── <env-name>
    ```
  
1. Add the Helm Chart of your application with production environment configurations.
  
    ```bash
    └── <tenant-name>
        └── <app-name>
            └── <env-name>
                ├── Chart.yaml
                ├── values.yaml
                └── templates/
    ```
  
1. Add an folder `<env-name>` inside `<tenant-name>/argocd-apps`. Add an ArgoCD Application in this folder which points to `<tenant-name>/<app-name>/<env-name>`.
  
    ```yaml
    # Name: <app-name>.yaml(APP_NAME.yaml)
    # Path: <tenant-name>/argocd-apps/<env-name> (TENANT_NAME/   argocd-apps/ENV_NAME/)
    apiVersion: argoproj.io/v1alpha1
    kind: Application
    metadata:
      name: <tenant-name>-<env-name>-<app-name>
      namespace: rh-openshift-gitops-instance
    spec:
      destination:
        namespace: <target-namespace>
        server: 'https://kubernetes.default.svc'
      project: <tenant-name>
      source:
        path: <tenant-name>/<app-name>/<env-name>
        repoURL: <apps-gitops-repo-url>
        targetRevision: HEAD
      syncPolicy:
        automated:
          prune: true
          selfHeal: true
    ```
  
1. Add a folder called production (if not present)  corresponding to the cluster name inside `argocd-apps` at root level, Add an ArgoCD Application in this folder which points to `<tenant-name>/argocd-apps/<env-name>`.
  
    ```yaml
    # Name: <tenant-name>-<env-name>.yaml (TENANT_NAME-ENV_NAME.yaml)
    # Path: argocd-apps/<env-name>
    apiVersion: argoproj.io/v1alpha1
    kind: Application
    metadata:
      name: <tenant-name>-<env-name>
      namespace: rh-openshift-gitops-instance
    spec:
      destination:
        namespace: <target-namespace>
        server: 'https://kubernetes.default.svc'
      project: <tenant-name>
      source:
        path: <tenant-name>/argocd-apps/<env-name>
        repoURL: <apps-gitops-repo-url>
        targetRevision: HEAD
      syncPolicy:
        automated:
          prune: true
          selfHeal: true
    ```
  
1. You should have a similar folder structure at the end:
  
    ```bash
    ├── <tenant-name>
    |   ├── <app-name>
    |   |   ├── <env-name>
    |   |   |   ├── Chart.yaml
    |   |   |   ├── values.yaml
    |   |   └── └── templates/
    ├── └── argocd-apps
    |       └── <env-name>
    |            └── <app-name>.yaml
    └── argocd-apps
        └── <cluster-name> (cluster name)
            └── <tenant-name>-prod.yaml
    ```
  
1. Make sure Application that deploys applications inside `argocd-apps/cluster-name/` folder is deployed in relevant `infra-gitops-config` repository.

!!! note
    Anything defined in `<angle brackets>` are values that needs to be replaced according to specific needs. 
    
Brief details about what each key means is defined below:
1. `tenant-name`: Name of the tenant where this environment needs to be deployed.
2. `app-name`: Name of the application where this environment will be used.
3. `cluster-name`: Name of the cluster. 
4. `env-name`: Name of the environment.
5. `target-namespace`: Name of the namespace where this environment will be deployed.
6. `apps-gitops-repo-url`: URL for apps gitops repository. 