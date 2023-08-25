# Preparing Environment for Pipeline as code

# Prerequisites

For performing this tutorial, you will need to have SAAP Cluster Admin role on the cluster

This tutorial assumes that tekton-pipeline-scc and tekton-pipeline-clusterrole are already deployed in the SAAP cluster.

MTO deployed on the Cluster

Pre configured infra repository (TODO: link tutorial)

# Deploying Service Account and RoleBinding

We will use Multi-Tenant Operator's Templates and Template Group Instances to deploy a pipeline service account and a pipeline-rolebinding to the tenant's build namespaces.

1. Navigate to the infrastructure repository that you've prepared earlier. If not done already, create the repository or use any other repository bootstrapped with ArgoCD. (TODO: Add screenshot and link tutorial)

2. Inside the tenant-operator-config folder, create a new directory named pipeline-resources.

3. Within the pipeline-resources directory, create a file named rbac-template.yaml and add the following content:

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
  
4. Now let's create a TemplateGroupInstance for this in the same folder:

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

