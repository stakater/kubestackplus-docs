# Add cluster task

## Objective

- Add cluster task via infra GitOps

## Key Results

- Deploy cluster task via infra GitOps repository
- Validate via ArgoCD UI

### Step 1: Adding ClusterTasks to the Infra GitOps Repository

1. Go to the [Nordmart Infra GitOps repository](https://github.com/stakater/nordmart-infra-gitops-config/tree/main).
1. Navigate to the cluster directory corresponding to your desired environment, e.g. "dev-test".
1. Within the directory, locate the "`clustertasks`" directory. Note: You will have to create "`clustertasks`" directory the first time.
1. Create a ClusterTask custom resource (CR) file in the "`clustertasks`" directory. Name the file using the following format: `<clustertask-name>-<chart-version>.yaml`.
    - Replace `<clustertask-name>` with the name of the ClusterTask, separated by dashes.
    - Replace <chart-version> with the specific version of the ClusterTask.
    - Example: `buildah-0.0.1.yaml`
1. Whenever a new version of the ClusterTask is added or modified, increment the patch version in the file name. For example, the next version could be `buildah-0.0.2.yaml`.

### Step 2: Creating an ArgoCD Application

1. Navigate to the `dev-test/argocd-apps` directory in the Infra GitOps repository.
1. Create a new ArgoCD application YAML file within the `argocd-apps` directory.
1. Configure the application file to point to the previously added ClusterTask custom resource repository.
    - Set the repository URL to the location of the ClusterTask CR files in the Infra GitOps repository, like in the example below:

    ```yaml
    apiVersion: argoproj.io/v1alpha1
    kind: Application
    metadata:
        name: clustertasks
        namespace: openshift-gitops
    spec:
        destination:
            namespace: openshift-gitops
            server: 'https://kubernetes.default.svc'
        source:
            path: dev-test/clustertasks
            repoURL: 'https://github.com/stakater/nordmart-infra-gitops-config.git'
            targetRevision: main
            directory:
            recurse: true
        project: default
        syncPolicy:
            automated:
            prune: true
            selfHeal: true
    ```

1. Once pushed, ArgoCD will automatically detect changes in the Infra GitOps repository and deploy the ClusterTasks defined in the Clustertask CR files.

### Step 3: Validating ClusterTask Deployment via ArgoCD UI

1. Open the ArgoCD UI by accessing the ArgoCD server URL and log in.
1. Locate the application you created in Step 2 under the list of applications and click on it to view details.
1. Verify that the synchronization status indicates a successful deployment. Look for any error messages or warnings that might indicate issues with the deployment process.
1. If there are any errors, review the logs and configuration to troubleshoot and resolve them.
