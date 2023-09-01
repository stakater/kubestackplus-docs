# Preparing Environment for Pipeline as code

## Prerequisites

1. You should have SAAP Cluster Admin role on the cluster.
1. `tekton-pipelines-scc` SCC (Security Context Configurations) and `tekton-pac-cluster` ClusterRole should already be deployed in the SAAP cluster.
1. Multi-Tenant Operator (MTO).
1. You have a pre-configured infrastructure repository. If you haven't already configured it, follow [this tutorial](../../tutorials/01-configure-infra-gitops-config/configure-infra-gitops-repo.md)

## Deploying Service Account and RoleBinding

We will use Multi-Tenant Operator's Templates and Template Group Instances to deploy a pipeline service account and a pipeline-rolebinding to the tenant's build namespaces.

1. Navigate to the infrastructure repository that you've prepared earlier. If not done already, create the repository or use any other repository bootstrapped with ArgoCD.
1. Inside the tenant-operator-config folder, create a new directory named pipeline-resources.
1. Within the pipeline-resources directory, create a file named `tekton-pac-rbac.yaml` and add the following content:

   ```yaml
   apiVersion: tenantoperator.stakater.com/v1alpha1
   kind: Template
   metadata:
     name: tekton-pac-rbac
   resources:
     manifests:
     - apiVersion: rbac.authorization.k8s.io/v1
       kind: RoleBinding
       metadata:
         name: tekton-pac-rolebinding
       subjects:
         - kind: ServiceAccount
           name: pipeline
           namespace: "${tenant}-build"
       roleRef:
          apiGroup: rbac.authorization.k8s.io
          kind: ClusterRole
          name: tekton-pac-clusterrole
     - apiVersion: v1
       kind: ServiceAccount
       metadata:
         name: pipeline
         labels:
           multi-tenant-operator/ignore-resource-updates: ''
       secrets:
         - name: nexus-docker-config
   ```

1. Now let's create a TemplateGroupInstance for this in the same folder. Create a file name `tekon-pac-tgi.yaml` and add the following content:

   ```yaml
   apiVersion: tenantoperator.stakater.com/v1alpha1
   kind: TemplateGroupInstance
   metadata:
     name: tekton-pac-tgi
   spec:
     selector:
       matchExpressions:
       - {key: stakater.com/kind, operator: In, values: [build]}
     sync: true
     template: tekton-pac-rbac
   ```

   ![`pipeline-template`](./images/templates.png)

1. If you already have ArgoCD application watching these folders, you will see the resources syncing in ArgoCD.

 ![`ArgoCD`](./images/ArgoCD.png)
