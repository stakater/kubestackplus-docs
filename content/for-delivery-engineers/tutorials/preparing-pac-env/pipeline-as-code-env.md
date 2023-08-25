# Preparing Environment for Pipeline as code

# Prerequisites

1. You should have SAAP Cluster Admin role on the cluster.
2. `tekton-pipeline` SCC (Service Cluster Configurations) and Tekton Pipeline ClusterRole should already be deployed in the SAAP cluster.
3. Multi-Tenant Operator (MTO).
4. You have a pre-configured infrastructure repository. If you already configured it, follow [this tutorial](../../tutorials/01-configure-infra-gitops-config/configure-infra-gitops-repo.md)

# Deploying Service Account and RoleBinding

We will use Multi-Tenant Operator's Templates and Template Group Instances to deploy a pipeline service account and a pipeline-rolebinding to the tenant's build namespaces.

1. Navigate to the infrastructure repository that you've prepared earlier. If not done already, create the repository or use any other repository bootstrapped with ArgoCD. (TODO: Add screenshot and link tutorial)

2. Inside the tenant-operator-config folder, create a new directory named pipeline-resources.

3. Within the pipeline-resources directory, create a file named tekton-pipeline-template.yaml and add the following content:

   ```yaml
   apiVersion: tenantoperator.stakater.com/v1alpha1
   kind: Template
   metadata:
     name: tekton-pipeline-template
   resources:
     manifests:
     - apiVersion: rbac.authorization.k8s.io/v1
       kind: RoleBinding
       metadata:
         name: tekton-pipeline-rolebinding
       subjects:
         - kind: ServiceAccount
           name: pipeline
           namespace: "${tenant}-build"
       roleRef:
          apiGroup: rbac.authorization.k8s.io
          kind: ClusterRole
          name: tekton-pipelne-clusterrole
     - apiVersion: v1
       kind: ServiceAccount
       metadata:
         name: pipeline
         labels:
           multi-tenant-operator/ignore-resource-updates: ''
       secrets:
         - name: nexus-docker-config
   ```
  
4. Now let's create a TemplateGroupInstance for this in the same folder. Create a file name tekon-pipeline-tgi.yaml and add the following content:

  ```yaml
  apiVersion: tenantoperator.stakater.com/v1alpha1
  kind: TemplateGroupInstance
  metadata:
    name: tekton-pipeline-tgi
  spec:
    selector:
      matchExpressions:
      - {key: stakater.com/kind, operator: In, values: [build]}
    sync: true
    template: tekton-pipeline-template
  ```
             
 ![`pipeline-template`](../images/pipeline-template.png)
