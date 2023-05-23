# Responsibilities

This page describes the responsibilities of Stakater and customers with respect to the various parts of SAAP. In essence, Stakater takes responsibility for the platform and platform data, while customer takes responsibility for their own applications and application data.

## Data and Applications

Customers are completely responsible for their own applications, workloads, and data that they deploy to SAAP. SAAP provides tools to help customers setup, manage, secure, integrate and optimize their apps.

=== "Customer Data"

    | Stakater Responsibilities | Customer Responsibilities |
    | --- | --- |
    | <ul><li>Maintain platform-level standards for data encryption</li><li>Provide components to help manage application data such as secrets</li><li>Enable integration with third-party data services to store and manage data outside the cluster or cloud provider</li></ul> | <ul><li>All customer data stored on the platform and how customer applications consume and expose this data</li><li>Backup and restore</li></ul> |

=== "Customer Applications"

    | Stakater Responsibilities | Customer Responsibilities |
    | --- | --- |
    | <ul><li>Create clusters with SAAP components installed, so that you can access SAAP to deploy and manage your containerized apps</li><li>Install and provide fully managed SAAP add-ons to extend your app's capabilities</li><li>Provide storage classes and plug-ins to support persistent volumes for use with your apps</li><li>Provide a container image registry, so customers can securely store application container images on the cluster to deploy and manage applications</li></ul> | <ul><li>Complete lifecycle of customer applications and customer chosen third-party applications: <ul><li>Monitoring</li><li>Configuration</li><li>Deployment</li><li>Version management</li><li>Resource limits</li><li>Cluster sizing</li><li>Permissions</li><li>Integrations</li><li>Backup and restore</li></ul></li></ul> |

## Change Management

Stakater is responsible for change management of the control plane nodes, infrastructure nodes and services, and worker nodes. The customer is responsible for initiating infrastructure change requests needed for customer applications, and installing and maintaining optional services and networking configurations on the cluster, as well as all changes to customer data and customer applications.

=== "Logging"

    | Stakater Responsibilities | Customer Responsibilities |
    | --- | --- |
    | <ul><li>Aggregate and monitor platform logs</li><li>Provide and maintain a logging operator to enable the customer to deploy a logging stack for default application logging</li></ul> | <ul><li>Install, configure, and maintain any optional app logging solutions in addition to the provided ones</li><li>Modify size and frequency of application logs being produced by customer applications if they are affecting the stability of the cluster</li></ul> |

=== "Application Networking"

    | Stakater Responsibilities | Customer Responsibilities |
    | --- | --- |
    | <ul><li>Provide the ability to set up private load balancers when required</li><li>Provide the ability to set the OpenShift router as private</li><li>Install, configure, and maintain OpenShift SDN components for default internal pod traffic</li><li>Assist the customer with `NetworkPolicy` and `EgressNetworkPolicy` objects</li></ul> | <ul><li>Configure non-default pod network permissions for project and pod networks, pod ingress, and pod egress using `NetworkPolicy` objects</li><li>Request and configure any additional service load balancers for specific services</li><li>Configure any necessary DNS forwarding rules</li></ul> |

=== "Cluster Networking"

    | Stakater Responsibilities | Customer Responsibilities |
    | --- | --- |
    | <ul><li>Set up cluster management components, such as public or private service endpoints and necessary integration with virtual networking components</li><li>Set up internal networking components required for internal cluster communication between worker, infrastructure, and control plane nodes</li></ul> | <ul><li>Provide optional non-default IP address ranges for machine CIDR, service CIDR, and pod CIDR if needed through the SAAP console when the cluster is created</li></ul> |

=== "Virtual Networking"

    | Stakater Responsibilities | Customer Responsibilities |
    | --- | --- |
    | <ul><li>Set up and configure virtual networking components required to provision the cluster, including virtual private cloud, subnets, load balancers, internet gateways, NAT gateways</li><li>Provide the ability for the customer to manage VPN connectivity with on-premises resources, VPC to VPC connectivity, and direct connectivity as required</li></ul> | <ul><li>Set up and maintain optional public cloud networking components</li></ul> |

=== "Cluster Version"

    | Stakater Responsibilities | Customer Responsibilities |
    | --- | --- |
    | <ul><li>Own the cluster upgrade scheduling process</li><li>Publish changelogs and release notes for upgrades</li></ul> | <ul><li>Schedule patch version upgrades either immediately or at a specific date</li><li>Acknowledge and schedule minor and major version upgrades</li><li>Test customer applications on all versions to ensure compatibility</li></ul> |

=== "Capacity Management"

    | Stakater Responsibilities | Customer Responsibilities |
    | --- | --- |
    | <ul><li>Monitor use of control plane nodes and infrastructure nodes</li><li>Scale or resize control plane nodes to maintain quality of service</li><li>Monitor use of customer resources including network, storage and compute capacity. Where autoscaling features are not enabled, alert customer for any changes required to cluster resources.</li></ul> | <ul><li>Respond to Stakater notifications regarding cluster resource requirements</li></ul> |

## Disaster Recovery

| Stakater Responsibilities | Customer Responsibilities |
| --- | --- |
| <ul><li>Recovery of SAAP in case of disaster</li></ul> | <ul><li>Recovery of the workloads that run the cluster and your applications' data</li><li>Disaster recovery for any third-party integrations with other cloud services such as file, block, object, cloud database, logging, or audit event services</li></ul> |

## Incident Operations Management

The customer is responsible for incident and operations management of customer application data and any custom networking the customer might have configured for the cluster network or virtual network.

=== "Application Networking"

    | Stakater Responsibilities | Customer Responsibilities |
    | --- | --- |
    | <ul><li>Respond to platform-component related alerts</li><li>Monitor cloud load balancers and native OpenShift router services</li></ul> | <ul><li>Monitor health of customer service load balancer endpoints</li><li>Monitor health of customer application routes, and the endpoints behind them</li></ul> |

=== "Virtual Networking"

    | Stakater Responsibilities | Customer Responsibilities |
    | --- | --- |
    | <ul><li>Monitor cloud load balancers, subnets, and public cloud components necessary for default platform networking</li></ul> | <ul><li>Monitor network traffic that is optionally configured through VPC to VPC connection, VPN connection, or direct connection</li></ul> |

## Identity Access Management

=== "Logging"

    | Stakater Responsibilities | Customer Responsibilities |
    | --- | --- |
    | <ul><li>Just-in-time access to relevant logs via Privileged Access Management (PAM)</li></ul> | <ul><li>Configure OpenShift RBAC to control access to projects and by extension a project's application logs</li><li>For third-party or custom application logging solutions, the customer is responsible for access management</li></ul> |

=== "Application Networking"

    | Stakater Responsibilities | Customer Responsibilities |
    | --- | --- |
    | <ul><li>Just-in-time access to relevant logs via Privileged Access Management (PAM)</li></ul> | <ul><li>Manage organization administrators for Stakater to grant access to SAAP console</li></ul> |

=== "Cluster Networking"

    | Stakater Responsibilities | Customer Responsibilities |
    | --- | --- |
    | <ul><li>Just-in-time access to relevant logs via Privileged Access Management (PAM)</li></ul> | <ul><li>Manage organization administrators for Stakater to grant access to SAAP console</li></ul> |

=== "Virtual Networking"

    | Stakater Responsibilities | Customer Responsibilities |
    | --- | --- |
    | <ul><li>Just-in-time access to relevant logs via Privileged Access Management (PAM)</li></ul> | <ul><li>Manage optional user access to public cloud components</li></ul> |

## Security Regulation Compliance

=== "Logging"

    | Stakater Responsibilities | Customer Responsibilities |
    | --- | --- |
    | <ul><li>Retain audit logs for security incidents for a defined period of time to support forensic analysis</li></ul> | <ul><li>Analyze application logs for security events</li></ul> |

=== "Virtual Networking"

    | Stakater Responsibilities | Customer Responsibilities |
    | --- | --- |
    | <ul><li>Monitor virtual networking components for potential issues and security threats</li></ul> | <ul><li>Monitor optionally-configured virtual networking components for potential issues and security threats</li></ul> |
