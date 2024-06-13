# Service Definition

This section outlines the service definition for Stakater App Agility Platform (SAAP):

## Platform

### Autoscaling

Node autoscaling is available on few clouds; you can find details in the relevant [cloud section](cloud-providers/overview.md). You can configure the autoscaler option to automatically scale the number of machines in a cluster.

### Daemonsets

Customers can create and run daemonsets on SAAP. To restrict daemonsets to only run on worker nodes, use the following `nodeSelector`:

```yaml
...
spec:
  nodeSelector:
    role: worker
...
```

### Multiple Availability Zone

In a multiple availability zone cluster, control plane nodes are distributed across availability zones and at least one worker node is required in each availability zone.

### Node Labels

Custom node labels are created by Stakater during node creation and cannot be changed on SAAP at this time. However, custom labels are supported when creating new machine pools.

### OpenShift Version

SAAP is run as a managed service and is kept up to date with the latest OpenShift Container Platform version, see [change management in responsibilities](responsibilities.md#change-management). Upgrade scheduling to the latest version is available.

### Container Engine

SAAP runs on OpenShift 4 and uses [CRI-O](https://www.redhat.com/en/blog/red-hat-openshift-container-platform-4-now-defaults-cri-o-underlying-container-engine) as the only available container engine.

### Operating System

SAAP runs on OpenShift 4 and uses Red Hat CoreOS as the operating system for all control plane and worker nodes.

### Upgrades

Upgrades can be done either immediately or be scheduled at a specific date by opening a [support ticket](https://support.stakater.com/index.html).

See the [SAAP Update Life Cycle](update-lifecycle.md) for more information on the upgrade policy and procedures.

### Kubernetes Operator Support

All operators listed in the [Operator Hub marketplace](https://operatorhub.io/) should be available for installation. These operators are considered customer workloads, and are not monitored by Stakater SRE, see [customer applications responsibilities](responsibilities.md#data-and-applications).

### Red Hat Operator Support

Red Hat workloads typically refer to Red Hat-provided operators made available through [Operator Hub](https://operatorhub.io/). Red Hat workloads are not managed by the Stakater SRE team, and must be deployed on worker nodes and must be managed by the customer, see [customer applications responsibilities](responsibilities.md#data-and-applications).

## Account Management

### Billing

SAAP requires a minimum base cluster purchase with minimum technical requirements specified in [Sizing](../for-administrators/plan-your-environment/sizing.md).

Customers can either use their existing cloud infrastructure account to deploy SAAP, or use one of Stakater's partners to create infrastructure. The customer always pays Stakater for the SAAP subscription and pays the cloud provider for the cloud costs. It is the customer's responsibility to pre-purchase or provide compute instances to ensure lower cloud infrastructure costs.

Billing for SAAP is on a monthly basis, or yearly basis with discounts.

### Cloud Providers

SAAP is available as a managed platform on the cloud providers listed on the [cloud providers overview](cloud-providers/overview.md).

## Storage

All storage needed for SAAP will be provided through the cloud provider of the customer's choice.

## Security

### Authentication Provider

Authentication for the cluster is configured as part of the cluster creation process. SAAP is not an identity provider, and all access to the cluster must be managed by the customer as part of their integrated solution. Creating multiple identity providers at the same time is supported. The following identity providers are supported:

- GitHub or GitHub Enterprise OAuth
- GitLab OAuth
- Google OAuth
- LDAP
- OpenID connect

### Privileged Containers

Privileged containers are not available by default on SAAP. The `anyuid` and `nonroot` Security Context Constraints (SCC) are available for members of the Customer Admin group, and should address many use cases. Privileged containers are only available for Customer Admin users.

### Customer Administrator User

In addition to normal users, Stakater provides access to a SAAP-specific group called `Customer Admin`. The permissions for this role is described on the [roles in SAAP](../for-administrators/secure-your-cluster/saap-authorization-roles.md).

### Cluster Administration Role

As an administrator of SAAP, you have access to the cluster-admin role. While logged in to an account with the cluster-admin role, users have mostly unrestricted access to control and configure the cluster.

## Networking

### Custom Domains for applications

To use a custom hostname for a route, you must update your DNS provider by creating a canonical name (CNAME) record. Your CNAME record should map the SAAP canonical router hostname to your custom domain. The SAAP canonical router hostname is shown on the Route Details page after a Route is created. Alternatively, a wildcard CNAME record can be created once to route all subdomains for a given hostname to the cluster's router.

### Custom domains for cluster services

Custom domains and subdomains for cluster services are available except for the SAAP service routes, for example, the API or web console routes, or for the default application routes.

### Domain validated certificates

SAAP includes TLS security certificates needed for both internal and external services on the cluster. For external routes, there are two, separate TLS wildcard certificates that are provided and installed on each cluster, one for the web console and route default hostnames and the second for the API endpoint. Let's Encrypt is the certificate authority used for certificates. Routes within the cluster, for example, the internal API endpoint, use TLS certificates signed by the cluster's built-in certificate authority and require the CA bundle available in every pod for trusting the TLS certificate.

### Load-balancers

SAAP is normally created via the installer provisioned infrastructure (IPI) installation method which installs operators that manage load-balancers in the customer cloud, and API load-balancers to the control plane nodes. Application load-balancers are created as part of creating routers and ingresses. The operators use cloud identities to interact with the cloud providers API to create the load-balancers.

User-provisioned installation (UPI) method is also possible if extra security is needed and then you must create the API and application ingress load balancing infrastructure separately and before SAAP is installed.

SAAP has a default router/ingress load-balancer that is the default application load-balancer, denoted by `apps` in the URL. The default load-balancer can be configured in SAAP to be either publicly accessible over the internet, or only privately accessible over a pre-existing private connection. All application routes on the cluster are exposed on this default router load-balancer, including cluster services such as the logging UI, metrics API, and registry.

SAAP has an optional router/ingress load-balancer that is a secondary application load-balancer, denoted by `apps2` in the URL. The secondary load-balancer can be configured in SAAP to be either publicly accessible over the internet, or only privately accessible over a pre-existing private connection. If a 'Label match' is configured for this router load-balancer, then only application routes matching this label will be exposed on this router load-balancer, otherwise all application routes are also exposed on this router load-balancer.

SAAP has optional load-balancers for services that can be mapped to a service running on SAAP to enable advanced ingress features, such as non-HTTP/SNI traffic or the use of non-standard ports. Cloud providers may have a quota that limits the number of load-balancers that can be used within each cluster.

### Network use

Network use is not monitored, and is billed directly by the cloud provider.

### Cluster ingress

Project administrators can add route annotations for ingress control through IP allow-listing.

Ingress policies can also be changed by using `NetworkPolicy` objects.

All cluster ingress traffic goes through the defined load-balancers. Direct access to all nodes is blocked by cloud configuration.

### Cluster egress

`EgressNetworkPolicy` objects can control pod egress traffic to prevent or limit outbound traffic in SAAP.

Public outbound traffic from the control plane and infrastructure nodes is required and necessary to maintain cluster image security and cluster monitoring. This requires the `0.0.0.0/0` route to belong only to the internet gateway.

## Monitoring Stack

### Cluster Metrics

SAAP come with an integrated Prometheus/Grafana stack for cluster monitoring including CPU, memory, and network-based metrics. This is accessible through the SAAP web console. These metrics also allow for horizontal pod autoscaling based on CPU or memory metrics.

### Application Metrics

SAAP provides an integrated application monitoring stack based on Prometheus/Grafana stack to monitor business applications. This allows for adding scrape targets in user namespaces.

### Metrics Data Retention

Data is stored for 14 days only. If you need to store data for a longer period, please forward it to another system. For assistance, open a [support ticket](https://support.stakater.com/index.html).

### Metrics Forwarding

For assistance, open a [support ticket](https://support.stakater.com/index.html).

## Logging Stack

### Cluster Operations and Audit Logging

SAAP deploys with services for maintaining the health and performance of the cluster and its components. These services include cluster operations and audit logs. Cluster operations and audit logs are forwarded automatically to logging stack for support and troubleshooting. This data is only accessible to authorized support staff via approved mechanisms.

### Application Logging

SAAP offers an integrated logging stack utilizing Vector as the collector and Loki as the log store. Application logs sent to `STDOUT` are gathered by the log collector and forwarded to the log store via the cluster logging stack.

### Data Retention

Retention is set to seven days, with a limit of 200 GiB of logs per shard. For longer-term retention, customers should use the sidecar container design in their deployments and forward logs to their preferred log aggregation or analytics service. This integrated logging stack is intended for short-term retention to aid in cluster and application troubleshooting, not for long-term log archiving. For assistance, open a [support ticket](https://support.stakater.com/index.html).

### Log Forwarding

The pre-integrated 
For assistance, open a [support ticket](https://support.stakater.com/index.html).

## Artifact Store - Nexus

SAAP includes Nexus OSS as an integrated artifact store, restricted for use solely by applications running within SAAP. It is used to store Docker images, Helm charts, application dependencies, and other related artifacts.

## Application Backup and Restore - Velero

SAAP includes Velero (OADP) for application and volume backup and restore. Users can configure backups using this integration. While a default S3 backup bucket is provided, customers also have the option to select a different S3 bucket provider. For assistance, open a [support ticket](https://support.stakater.com/index.html).

## Secrets Store - HashiCorp Vault OSS

SAAP includes HashiCorp Vault OSS for secrets management, limited to use by applications running on SAAP.

### Clouds Secrets Store

SAAP includes the External Secrets Operator (ESO) integrated with Vault OSS out of the box. If customers prefer a different secret store, ESO can be configured to connect with it. For assistance, open a [support ticket](https://support.stakater.com/index.html).

## In-Cluster Multi Tenancy

...

## Service Mesh

...

## Internal Development Platform (IDP)

...
