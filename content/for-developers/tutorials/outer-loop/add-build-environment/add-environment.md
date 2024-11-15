# Add environment

Lets see how can we add an environment to an application in a tenant. Lets say, we have added a production cluster and want to add a new environment in application for it to be deployed on production.

1. Create a folder named `production` at `<tenant-name>/<app-name>` which corresponds to the production environment. Suppose `gabbar` as tenant name, `stakater-nordmart-review` as application name, `production` as cluster name, `prod` as environment name.

   ```bash
   └── gabbar
       └── stakater-nordmart-review
           └── prod
   ```

2. Add the Helm Chart of your application with production environment configurations.

   ```bash
   └── gabbar
       └── stakater-nordmart-review
           └── prod
               ├── Chart.yaml
               ├── values.yaml
               └── templates/
   ```

3. Add an folder `prod` inside `<tenant-name>/argocd-apps`. Add an ArgoCD Application in this folder which points to `<tenant-name>/<app-name>/prod`.

   ```yaml
   # Name: stakater-nordmart-review.yaml(APP_NAME.yaml)
   # Path: gabbar/argocd-apps/prod (TENANT_NAME/   argocd-apps/ENV_NAME/)
   apiVersion: argoproj.io/v1alpha1
   kind: Application
   metadata:
     name: gabbar-prod-stakater-nordmart-review
     namespace: openshift-gitops
   spec:
     destination:
       namespace: TARGET_NAMESPACE
       server: 'https://kubernetes.default.svc'
     project: gabbar
     source:
       path: gabbar/stakater-nordmart-review/prod
       repoURL: 'APPS_GITOPS_REPO_URL'
       targetRevision: HEAD
     syncPolicy:
       automated:
         prune: true
         selfHeal: true
   ```

4. Add a folder called production (if not present)  corresponding to the cluster name inside `argocd-apps` at root level, Add an ArgoCD Application in this folder which points to `<tenant-name>/argocd-apps/prod`.

   ```yaml
   # Name: gabbar-prod.yaml (TENANT_NAME-ENV_NAME.yaml)
   # Path: argocd-apps/prod
   apiVersion: argoproj.io/v1alpha1
   kind: Application
   metadata:
     name: gabbar-prod
     namespace: openshift-gitops
   spec:
     destination:
       namespace: TARGET_NAMESPACE
       server: 'https://kubernetes.default.svc'
     project: gabbar
     source:
       path: gabbar/argocd-apps/prod
       repoURL: 'APPS_GITOPS_REPO_URL'
       targetRevision: HEAD
     syncPolicy:
       automated:
         prune: true
         selfHeal: true
   ```

5. You should have a similar folder structure at the end:

   ```bash
   ├── gabbar
   |   ├── stakater-nordmart-review
   |   |   ├── prod
   |   |   |   ├── Chart.yaml
   |   |   |   ├── values.yaml
   |   |   └── └── templates/
   ├── └── argocd-apps
   |       └── prod
   |            └── stakater-nordmart-review.yaml
   └── argocd-apps
       └── production (cluster name)
           └── gabbar-prod.yaml
   ```

6. Make sure Application that deploys applications inside `argocd-apps/cluster-name/` folder is deployed in relevant `infra-gitops-config` repository.

