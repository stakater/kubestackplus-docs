# Privileged Roles in SAAP

Depending on responsibilities of a role, specific roles can be assigned to user groups, which enable them to achieve there daily tasks. Below is a list of roles provided by SAAP for different user groups.

Namespaces are divided into two sub-categories:

- **Stakater owned** : created by the Stakater team which consists of projects/namespaces with format `openshift*`, `stakater*`, `kube*`, `redhat*`, `default`
- **Customer owned** : created by the customer

Following are the roles available in SAAP:

## Cluster Admin

Cluster Admin is an OpenShift role which give the user assigned this role full Cluster-Admin Privileges including access to **Customer owned** as well as **Stakater owned** namespaces.

### Permissions

- Full access to manage the entire OpenShift cluster.
- Quick resolution of Priority:1 incidents and emergencies.
- Emergency and backdoor access for immediate intervention.

### Approval Process

1. Stakater Admin Identify Priority:1 incident.
1. Request Permission on Azure Privileged Identity Management Console
1. Approval escalated to Engineering Manager.
1. Authorization granted by Engineering Manager.
1. Stakater Admin is promoted to Cluster-Admin which then intervenes to resolve the incident.

This role ensures swift response and resolution in critical situations, with approval granted by the Engineering Manager for emergency access.

## Customer Admin

The permissions for the Customer Admin role includes:

### Permissions

#### Operators Permissions

- can view OperatorHub in console
- can create/view/delete CRs for [curated operators](curated-list-operators.md) e.g.
    - AMQ Certificate Manager Operator
    - OpenShift Pipelines Operator
- can install cluster-wide operators from a [curated list](curated-list-operators.md) provided by the OperatorHub. This makes the operator available to all developers on your cluster to create Custom Resources and applications using that Operator.
- can view installed operators by using the web console/CLI
- can install operators in customer owned namespace
- can manage subscriptions in customer owned namespace
- can not install privileged and custom operators cluster-wide
- can view `sealedsecrets` custom resource in all namespaces

#### Projects Permissions

- can create/update/patch customer owned namespaces
- can create/view/edit/delete all resources in customer owned namespaces
- can only view resources in Stakater owned namespaces
- can not view `secrets`, `configmaps` , `jobs` and `cronjobs` in Stakater owned namespaces

#### Storage

- can create/view/edit `persistentvolumeclaims`, `storageclasses`, and `volumesnapshots` in the cluster
- can not delete `persistentvolumeclaims`, `storageclasses` and `volumesnapshots` in the cluster

#### Networking

- can create/view/delete `NetworkPolicy` objects in customer owned namespaces
- can view services in all namespaces
- can view routes and ingresses in all namespaces
- can view/update DNS resources for DNS Forwarder `apigroups` in customer owned namespaces

#### Monitoring

- can view console dashboard where metrics are shown for namespaces
- can view customer owned namespaces status
- can view events in all namespaces

#### Compute

- can view machines, MachineSets, nodes, machine configs, machine config pools, imagestreams
- can start `anyuid` and `nonroot` SCCs
- can not delete machines, MachineSets, nodes, machine configs, machine config pools, imagestreams

#### User Management

- can view users/groups
- can view service accounts/roles/role bindings in customer owned namespaces
- can create/view on `UserIdentityMappings`
- can create/verify tokens and access
- can not delete members from cluster-admin
- can create `admin` rolebinding on customer owned namespaces
- can create edit rolebinding on customer owned namespaces
- can not view service accounts/roles/role bindings in Stakater owned namespaces
- can not add members to cluster-admin

#### Velero Backups & Restores

- can view/edit/create/delete Backup and Restores
- can view/edit/create/delete Schedules for Velero in `openshift-velero` namespace

#### Administration

- can create/edit/delete resource quotas and limits on the cluster
- can access the reserved `customer-admin` project on the cluster, which allows for the creation of `ServiceAccounts` with elevated privileges and gives the ability to update default limits and quotas for projects on the cluster
- `customer-admin` service account can create project
- `customer-admin` service account can delete project
- `customer-admin` service account cannot edit/create rolebinding
- can not create/edit/delete `clusterresourcequotas`

Only the mentioned permissions above are present for the role, for any other permission required the user need to raise a case with Stakater Support team.

### Approval Process

#### How to request this role from Stakater Support

If any user needs to be given `customer-admin` role , they can raise a request with Stakater team to assign the desired role to that user.

#### Items to be provided to Stakater Support

- User Email that needs to be assigned this group

## Stakater Admin

This role empowers administrators with the necessary permissions to maintain, debug and upgrade Stakater tools on the SAAP Managed platform while respecting security measures by excluding access to kubeconfig secrets and customer owned namespaces.

### Permissions

- This role has access to **Stakater owned** namespaces.
- Allows Stakater Admin Manage and troubleshoot Stakater tools on OpenShift Cluster.
- No access to kubeconfig secrets.
- Access to node metrics
- Does not have permission on **Customer owned** namespaces.

### Approval Process

1. Stakater Engineer accesses the OpenShift Cluster to manage and troubleshoot Stakater Tools
1. Request Permission on Azure Privileged Identity Management Console
1. Approval escalated to Team Lead
1. Authorization granted by Team Lead
1. Stakater Engineer is promoted to Stakater Admin which can do regular operations for Managing and Troubleshooting Stakater Tools
