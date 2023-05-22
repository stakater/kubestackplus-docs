# Responsibilities

This page describes the responsibilities of Stakater and customers with respect to the various parts of SAAP.

While Stakater manages SAAP, the customer shares responsibility with respect to certain aspects.

## Applications and data

Customers are completely responsible for their own applications, workloads, and data that they deploy to SAAP. SAAP provides various tools to help customers set-up, manage, secure, integrate and optimize their apps as described in this table:

=== "Customer data"

    Stakater responsibilities | Customer responsibilities
    --- | ---
    <ul><li>Maintain platform-level standards for data encryption</li><li>Provide components to help manage application data such as secrets</li><li>Enable integration with third-party data services to store and manage data outside the cluster or cloud provider</li></ul> | <ul><li>Maintain responsibility for all customer data stored on the platform and how customer applications consume and expose this data</li></ul>

=== "Customer applications"

    Stakater responsibilities | Customer responsibilities
    --- | ---
    <ul><li>Provision clusters with SAAP components installed, so that you can access SAAP to deploy and manage your containerized apps</li><li>Install and provide fully managed SAAP add-ons to extend your app's capabilities</li><li>Provide storage classes and plug-ins to support persistent volumes for use with your apps</li><li>Provide a container image registry, so customers can securely store application container images on the cluster to deploy and manage applications</li></ul> | <ul><li>Maintain responsibility for customer and third-party applications; data; and their complete lifecycle</li><li>If you add community third-party your own or other services to your cluster such as by using Operators then you are responsible for these services and for working with the appropriate provider to troubleshoot any issues</li><li>Use the provided tools and features to configure and deploy; keep up-to-date; set up resource requests and limits; size the cluster to have enough resources to run apps; set up permissions; integrate with other services; manage any image streams or templates that the customer deploys; externally serve; save back up and restore data; and otherwise manage their highly available and resilient workloads</li><li>Maintain responsibility for monitoring the applications run on SAAP</li></ul>

## Disaster Recovery

| Stakater responsibilities | Customer responsibilities |
| --- | --- |
| <ul><li>Recovery of SAAP in case of disaster</li></ul> | <ul><li>Recovery of the workloads that run the cluster and your applications data</li><li>If you integrate with other cloud services such as file, block, object, cloud database, logging, or audit event services, consult those services' disaster recovery information</li></ul> |

## Incident Operations Management

The customer is responsible for incident and operations management of customer application data and any custom networking the customer might have configured for the cluster network or virtual network.

=== "Application networking"

    | Stakater responsibilities | Customer responsibilities |
    | --- | --- |
    | <ul><li>Monitor cloud load balancers and native OpenShift router service, and respond to alerts.</li></ul> | <ul><li>Monitor health of service load balancer endpoints</li><li>Monitor health of application routes, and the endpoints behind them</li><li>Report outages to Stakater</li></ul> |

=== "Virtual networking"

    | Stakater responsibilities | Customer responsibilities |
    | --- | --- |
    | <ul><li>Monitor cloud load balancers, subnets, and public cloud components necessary for default platform networking</li><li>respond to alerts</li></ul> | <ul><li>Monitor network traffic that is optionally configured through VPC to VPC connection, VPN connection, or Direct connection for potential issues or security threats</li></ul>
