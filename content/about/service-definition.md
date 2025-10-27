# Service Definition

This section outlines the service definition for Stakater App Agility Platform (SAAP):

## Container Platform - OpenShift 4

### Overview

SAAP is built on OpenShift, leveraging its robust Kubernetes orchestration and enterprise-grade features. This ensures superior scalability, security, and developer productivity in managing and deploying applications.

### Autoscaling

Node autoscaling is available on few clouds; you can find details in the relevant [cloud section](cloud-providers/overview.md). You can configure the autoscaler option to automatically scale the number of machines in a cluster.

### Daemonsets

Customers can create and run daemonsets. To restrict daemonsets to only run on worker nodes, use the following `nodeSelector`:

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

### Windows Containers

SAAP supports Windows containers, enabling seamless deployment and management of both Windows and Linux applications within the same platform.

### Descheduler

SAAP includes the Kubernetes Descheduler to optimize workload placement within clusters. It periodically evicts and re-schedules pods to improve resource utilization and balance. This enhances overall cluster performance and reliability.

### Kubernetes Dashboard

SAAP includes the OpenShift Console, the most advanced Kubernetes dashboard available. It provides a user-friendly interface for managing and monitoring your Kubernetes clusters, applications, and resources. With rich features and intuitive design, it simplifies complex operations, enhances productivity, and empowers teams to manage their deployments efficiently.

## Storage

All storage needed for SAAP will be provided through the cloud provider of the customer's choice.

### Encrypted-at-rest OS and node storage

Control plane, infrastructure, and worker nodes can use encrypted-at-rest storage if supported by the cloud.

### Encrypted-at-rest PV

Volumes that are used for PVs can be encrypted-at-rest if supported by the cloud.

### Block storage (RWO)

RWO (Read-Write-Once) PVs are supported on all clouds.

RWO PVs can be attached only to a single node at a time and are specific to the availability zone in which they were provisioned. However, PVs can be attached to any node in the availability zone.

Each cloud provider has its own limits for how many PVs can be attached to a single node.

### Shared Storage (RWX)

RWX (Read-Write-Many) PVs are also supported when some distributed storage is available in the cloud. Alternatively, NFS can be deployed on the cluster to handle RWX use cases.

### ODF

SAAP can optionally include OpenShift Data Foundation (ODF), providing robust, integrated storage management. ODF supports dynamic provisioning and management of storage resources, enhancing the efficiency of data handling within Kubernetes environments.

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

### Cert-Manager

SAAP comes integrated with Cert-Manager to automate the management and renewal of SSL/TLS certificates. It ensures secure communication for your applications by handling certificate issuance and renewal seamlessly.

## Red Hat Advanced Cluster Security (RHACS)

SAAP offers Red Hat Advanced Cluster Security (RHACS) as an optional, managed addon, available for an **additional fee**. RHACS enhances security by providing:

- **Visibility**: Gain insights into cluster configurations, workload vulnerabilities, and container security risks.
- **Compliance**: Monitor compliance status, address regulatory requirements, and report on Kubernetes security standards.
- **Threat Detection**: Identify potential threats and unusual activities in real-time, leveraging automated responses for faster mitigation.

## Secrets Management Stack

### Secrets Stores

#### HashiCorp Vault OSS

SAAP includes HashiCorp Vault OSS for secrets management, limited to use by applications running on SAAP.

#### Clouds Secrets Store

SAAP supports integration with multiple cloud provider secret stores (e.g., AWS Secrets Manager, Azure Key Vault, Google Cloud Secret Manager). Through the External Secrets Operator (ESO), SAAP seamlessly connects to these cloud secrets stores, enabling users to manage secrets stored externally within their Kubernetes clusters.

### Secret Retrieval in Clusters

#### External Secrets Operator (ESO)

The [External Secrets Operator (ESO)](https://github.com/external-secrets/external-secrets) is included in SAAP to manage secret retrieval from both HashiCorp Vault OSS and supported cloud secret stores. ESO automates secret synchronization into clusters, ensuring secrets are securely available to applications as Kubernetes-native resources.

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

SAAP has optional load-balancers for services that can be mapped to a service running on SAAP to enable advanced ingress features, such as non-http/SNI traffic or the use of non-standard ports. Cloud providers may have a quota that limits the number of load-balancers that can be used within each cluster.

### Network use

Network use is not monitored, and is billed directly by the cloud provider.

### Cluster ingress

Project administrators can add route annotations for ingress control through IP allow-listing.

Ingress policies can also be changed by using `NetworkPolicy` objects.

All cluster ingress traffic goes through the defined load-balancers. Direct access to all nodes is blocked by cloud configuration.

### Cluster egress

`EgressNetworkPolicy` objects can control pod egress traffic to prevent or limit outbound traffic in SAAP.

Public outbound traffic from the control plane and infrastructure nodes is required and necessary to maintain cluster image security and cluster monitoring. This requires the `0.0.0.0/0` route to belong only to the internet gateway.

### Kubernetes Router

SAAP includes the OpenShift Router, the most advanced Kubernetes ingress controller available. It supports various routing options and protocols, ensuring high performance and reliability for your applications.

### ExternalDNS

SAAP integrates with [ExternalDNS](https://github.com/kubernetes-sigs/external-dns), automating DNS record management for Kubernetes services. This ensures seamless DNS updates as services are created or modified within the cluster, enhancing reliability and reducing manual DNS configuration efforts.

## Monitoring Stack

### Cluster Metrics

SAAP come with an integrated Prometheus/Grafana stack for cluster monitoring including CPU, memory, and network-based metrics. This is accessible through the SAAP web console. These metrics also allow for horizontal pod autoscaling based on CPU or memory metrics.

### Application Metrics

SAAP provides an integrated application monitoring stack based on Prometheus/Grafana stack to monitor business applications. This allows for adding scrape targets in user namespaces.

### Metrics Retention

Data is stored for 14 days only. If you need to store data for a longer period, please forward it to another system. For assistance, open a [support ticket](https://support.stakater.com/index.html).

### Metrics Forwarding

SAAP also supports integrating and forwarding metrics to your existing monitoring system. For a list of supported monitoring systems, contact our support team [here](https://support.stakater.com/index.html).

### Downtime Notifications - IMC

SAAP includes [Stakater IMC (IngressMonitorController)](https://github.com/stakater/IngressMonitorController), automating the setup of external uptime monitors for Kubernetes ingresses. It ensures continuous monitoring of application availability and performance with seamless integration into popular monitoring services.

### Cluster notifications

Cluster notifications are messages about the status, health, or performance of your cluster.

Cluster notifications are the primary way that Stakater Site Reliability Engineering (SRE) communicates with you about the health of your managed cluster. SRE may also use cluster notifications to prompt you to perform an action in order to resolve or prevent an issue with your cluster.

Cluster owners and administrators must regularly review and action cluster notifications to ensure clusters remain healthy and supported.

## Logging Stack

### Cluster Operations and Audit Logging

SAAP deploys with services for maintaining the health and performance of the cluster and its components. These services include cluster operations and audit logs. Cluster operations and audit logs are forwarded automatically to logging stack for support and troubleshooting. This data is only accessible to authorized support staff via approved mechanisms.

### Application Logging

SAAP offers an integrated logging stack utilizing Vector as the collector and Loki as the log store. Application logs sent to `STDOUT` are gathered by the log collector and forwarded to the log store via the cluster logging stack.

### Logs Retention

Retention is set to seven days, with a limit of 200 GiB of logs per shard. This can easily be changed. For longer-term retention, customers should use the sidecar container design in their deployments and forward logs to their preferred log aggregation or analytics service. This integrated logging stack is intended for short-term retention to aid in cluster and application troubleshooting, not for long-term log archiving. For assistance, open a [support ticket](https://support.stakater.com/index.html).

### Logs Forwarding

SAAP also supports integrating and forwarding logs to your existing monitoring system. For a list of supported logging systems, contact our support team [here](https://support.stakater.com/index.html).

## DevOps(CICD) Stack

### Artifact Store - Nexus

SAAP includes Nexus OSS as an integrated artifact store, restricted for use solely by applications running within SAAP. It is used to store Docker images, Helm charts, application dependencies, and other related artifacts.

### Continuous Deployment - ArgoCD

SAAP integrates ArgoCD for GitOps automation, leveraging Git as the source of truth for Kubernetes deployments. It streamlines version-controlled updates, rollbacks, and application management, ensuring consistency and reliability. ArgoCD's declarative approach simplifies configuration management, supporting efficient, automated deployments across your infrastructure.

#### Stakater GitOps Structure

SAAP provides a pre-defined GitOps repository structure, eliminating the need for teams to spend time and effort figuring out their own. This standardized approach ensures efficient deployment workflows and simplifies Kubernetes application deployment.

### Continuous Integration - Tekton

SAAP comes integrated with Tekton, an open-source, serverless CI/CD solution that is extremely powerful and flexible. This integration ensures streamlined, automated pipelines for building, testing, and deploying applications, enhancing productivity and efficiency for development teams.

#### Tekton Task Catalog

SAAP also includes a meticulously maintained [Tekton task catalog](https://github.com/stakater-tekton-catalog), featuring a comprehensive collection of pre-built and thoroughly validated CI/CD tasks. This catalog supports complete DevSecOps pipelines, ensuring seamless integration, security, and automation across the development lifecycle.

#### Stakater Trusted Application Pipelines

Stakater's Trusted Application Pipeline mitigates unexpected vulnerabilities, simplifying the secure build and deployment of cloud-native applications to Kubernetes platforms. These pipelines wraps the process in a highly secure and manageable workflow, ensuring that developers and operations teams can focus on their jobs without needing deep Kubernetes expertise.

### Leader Application Helm Chart

SAAP ships with the [Leader Helm application chart](https://github.com/stakater/application), providing a standardized approach to deploying applications. This ensures consistent and efficient deployments across all environments within SAAP.

### SonarQube

SAAP integrates with SonarQube for robust code quality analysis and security scanning. This tool is exclusively for applications deployed on SAAP, ensuring high standards of code integrity and safety.

### Feature/Pull Request Environments - Tronador

SAAP includes Stakater [Tronador](https://docs.stakater.com/tronador/), a powerful tool that deploys applications in dynamic ephemeral environments upon pull requests. This ensures seamless testing and validation in isolated environments. Once changes are merged, Tronador automatically cleans up, maintaining an efficient and clutter-free workspace. This integration significantly enhances the development workflow by providing reliable and automated environment management.

### Renovate

SAAP comes with Renovate, a tool for automating dependency updates. It helps keep applications secure and up-to-date by regularly checking for and applying updates. Renovate ensures a seamless and efficient dependency management process.

### Browser IDE - DevSpaces

SAAP includes DevSpaces to provide developers with cloud-based, ready-to-code environments. These workspaces streamline development by offering pre-configured setups, ensuring consistency and reducing setup time. DevSpaces enhances productivity by allowing developers to start coding immediately in a fully equipped environment.

### Tilt

SAAP includes [Tilt](https://tilt.dev/) to streamline the developer experience. Tilt enables rapid local development and testing for Kubernetes applications, enhancing productivity and ease of use for developers working on SAAP.

### Reloader

SAAP includes [Stakater Reloader](https://github.com/stakater/Reloader), which automatically restarts applications when ConfigMaps or Secrets change. This integration streamlines updates, enhances reliability, and minimizes downtime for developers.

### Forecastle

SAAP includes [Stakater Forecastle](https://github.com/stakater/Forecastle), a powerful tool that simplifies application discovery within Kubernetes clusters. This integration provides a unified, user-friendly dashboard, enhancing accessibility and efficiency.

## Application Backup and Restore - Velero

SAAP includes Velero (OADP) for application and volume backup and restore. Users can configure backups using this integration. While a default S3 backup bucket is provided, customers also have the option to select a different S3 bucket provider. For assistance, open a [support ticket](https://support.stakater.com/index.html).

## In-Cluster Multi Tenancy - Stakater MTO

SAAP comes integrated with [Stakater MTO (Multi-Tenant Operator)](https://docs.stakater.com/mto/latest/), the world’s leading in-cluster Kubernetes multi-tenancy solution. This allows organizations to easily share a cluster among multiple teams.

## Service Mesh

SAAP includes an Istio-based service mesh with a single control plane supported out of the box. Multiple control planes can be enabled upon request. For assistance, open a [support ticket](https://support.stakater.com/index.html).

## Internal Development Platform (IDP) - Backstage

SAAP includes a customized [Backstage](https://github.com/backstage/backstage) instance, providing a unified developer portal for managing applications. It enhances developer productivity and can be further tailored to meet specific needs.

## Account Management

### Billing and Pricing

SAAP requires a minimum base cluster purchase with minimum technical requirements specified in [Sizing](../for-administrators/plan-your-environment/sizing.md).

Customers can either use their existing cloud infrastructure account to deploy SAAP, or use one of Stakater's partners to create infrastructure. The customer always pays Stakater for the SAAP subscription and pays the cloud provider for the cloud costs. It is the customer's responsibility to pre-purchase or provide compute instances to ensure lower cloud infrastructure costs.

Billing for SAAP is on a monthly basis, or yearly basis with discounts.

### Cloud Providers

SAAP is available as a managed platform on the cloud providers listed on the [cloud providers overview](cloud-providers/overview.md).

### Cluster self-service

Customers can self-manage their clusters through the Stakater Cloud web console, including:

- Creating and deleting clusters
- Adding or removing identity providers
- Managing users in elevated groups
- Adding or removing machine pools and configuring autoscaling
- Defining upgrade policies

Note: Self-service capabilities are not supported on all cloud platforms.

### Instance types

Single availability zone clusters require a minimum of 3 control plane nodes, 2 infrastructure nodes, and 2 worker nodes deployed to a single availability zone.

Multiple availability zone clusters require a minimum of 3 control plane nodes, 3 infrastructure nodes, and 3 worker nodes. Additional nodes must be purchased in multiples of three to maintain proper node distribution.

Control plane and infrastructure nodes are deployed and managed by Stakater. Shutting down the underlying infrastructure through the cloud provider console is unsupported and can lead to data loss. There are at least 3 control plane nodes that handle etcd- and API-related workloads. There are at least 2 infrastructure nodes that handle metrics, routing, the web console, and other workloads. You must not run any workloads on the control and infrastructure nodes. Any workloads you intend to run must be deployed on worker nodes.

!!! note

    Approximately one vCPU core and 1 GiB of memory are reserved on each worker node and removed from allocatable resources. This reservation of resources is necessary to run processes required by the underlying platform. These processes include system daemons such as udev, kubelet, and container runtime among others. The reserved resources also account for kernel reservations.

    OpenShift Container Platform core systems such as audit log aggregation, metrics collection, DNS, image registry, SDN, and others might consume additional allocatable resources to maintain the stability and maintainability of the cluster. The additional resources consumed might vary based on usage.

### SLAs

Any SLAs for the service itself are defined [here](../legal-documents/sla.md).

### Support

SAAP on any cloud includes Stakater Premium Support, which can be accessed by using the [Stakater Customer Support Portal](https://support.stakater.com/).
