# GCP

A GCP account is needed to create and manage cluster on GCP. The following criteria must be met:

- An account on GCP
- A Stakater user (ask Stakater team for the email to use for this user) with admin privileges on a separate project (Recommended). See the [required permissions](https://docs.openshift.com/container-platform/4.9/installing/installing_gcp/installing-gcp-account.html#installation-gcp-permissions_installing-gcp-account) for GCP if you do not want to grant admin privilege.
- Resource limits must be applied on the account and the following resources must be allowed to be created:

  |Type        | Limit |
  |------------|------------|
  | Virtual Machines | Varies. The limit should be 12 initially. (Initial deployment is 3 control plane + 3 infra + 3 worker)|
  | Regional vCPUs | The limit should be A x B x 2 , where A = no. of VMs (worker + infra + control plane), B = vCPUs per VM) |
  | In-use global IP addresses | 4 |
  | Service accounts | 5 |
  | Firewall Rules | 11|
  | Forwarding Rules | 2|
  | Routers | 1|
  | Routes | 2|
  | Subnetworks | 2|
  | Firewall Rules | 11|
  | Persistent Disk SSD (GB)| 896|
  | Target Pools | 3|
  | Machine Specifications | 9 machines of 8x32x120G |
  | Region | Region will be identified by the customer |

## Autoscaling

Node autoscaling is available on GCP. You can configure the autoscaler option to automatically scale the number of machines in a cluster.
