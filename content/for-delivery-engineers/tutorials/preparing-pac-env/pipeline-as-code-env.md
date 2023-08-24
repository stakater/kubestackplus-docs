# Preparing Environment for Pipeline as code

# Prerequisites

For performing this tutorial, you will need to have SAAP Cluster Admin role on the cluster

This tutorial assumes that tekton-pipeline-scc and tekton-pipeline-clusterrole are already deployed in the SAAP cluster.

MTO deployed on the Cluster

Pre configured infra repository

# Deploying Service Account and RoleBinding

We will be using MTO's Templates and Template Group Instance to deploy `pipeline` service account and 'pipeline-rolebinding' to tenant's build namespaces

Navigate to the infra repository that we created earlier in the tutorial. If you haven't done so, you will need to do that first. Or can use any other repository that is bootstrapped with argocd.
In the tenant-operator-config folder, create a folder named `pipeline resources`.
Create a file named, rbac-template and add the following content to it:

```yaml
apiVersion: tenantoperator.stakater.com/v1alpha1
kind: Template
metadata:
  name: tekton-pipeline-validation-rbac
resources:
  manifests:
  - apiVersion: rbac.authorization.k8s.io/v1
    kind: RoleBinding
    metadata:
      name: pipeline-rolebinding
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
      name: stakater-tekton-builder
      labels:
        multi-tenant-operator/ignore-resource-updates: ''
    secrets:
      - name: nexus-docker-config
```

Now let's create a TemplateGroupInstance for this:

