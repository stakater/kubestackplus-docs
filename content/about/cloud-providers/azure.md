
An Azure subscription is needed to create and manage cluster on Azure. The following criteria must be met:

- An Azure subscription.
- A Stakater user (ask Stakater team for the email to use for this user) with privileges to create an application in Azure AD (Recommended). [Create a Service Principal](https://docs.openshift.com/container-platform/4.9/installing/installing_azure/installing-azure-account.html#installation-azure-service-principal_installing-azure-account) to be used by SAAP installer if you do not want to give permissions to Azure AD.
- Resource limits must be applied on the subscription and the following resources must be allowed to be created.

  |Type        | Limit |
  |------------|------------|
  | Virtual Machines | Varies. The limit should be 12 initially. (Initial deployment is 3 control plane + 3 infra + 3 worker) |
  | Regional vCPUs | The limit should be A x B x 2 , where A = no. of VMS (worker + infra + control plane), B = vCPUs per VM) |
  | Public IP addresses | 5 |
  | Private IP Addresses | 7 |
  | Network Interfaces | 6 |
  | Network Load Balancers   | 3 |
  | Virtual Networks | 1 |
  | StandardStorageSnapshots | 10000 (depends on how many disks are used) and backup duration |
  | Machine Specifications | 6 machines of 8x32x120G |
  | Region | Region will be identified by the customer |

## Autoscaling

Node autoscaling is available on Azure. You can configure the autoscaler option to automatically scale the number of machines in a cluster.
