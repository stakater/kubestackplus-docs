# Networking

## Custom Domains for applications

To use a custom hostname for a route, you must update your DNS provider by creating a canonical name (CNAME) record. Your CNAME record should map the SAAP canonical router hostname to your custom domain. The SAAP canonical router hostname is shown on the Route Details page after a Route is created. Alternatively, a wildcard CNAME record can be created once to route all subdomains for a given hostname to the cluster's router.

## Custom domains for cluster services

Custom domains and subdomains for cluster services are available except for the SAAP service routes, for example, the API or web console routes, or for the default application routes.

## Domain validated certificates

SAAP includes TLS security certificates needed for both internal and external services on the cluster. For external routes, there are two, separate TLS wildcard certificates that are provided and installed on each cluster, one for the web console and route default hostnames and the second for the API endpoint. Let's Encrypt is the certificate authority used for certificates. Routes within the cluster, for example, the internal API endpoint, use TLS certificates signed by the cluster's built-in certificate authority and require the CA bundle available in every pod for trusting the TLS certificate.

## Load-balancers

SAAP is normally created via the installer provisioned infrastructure (IPI) installation method which installs operators that manage load-balancers in the customer cloud, and API load-balancers to the master nodes. Application load-balancers are created as part of creating routers and ingresses. The operators use cloud identities to interact with the cloud providers API to create the load-balancers.

User-provisioned installation (UPI) method is also possible if extra security is needed and then you must create the API and application ingress load balancing infrastructure separately and before SAAP is installed.

SAAP has a default router/ingress load-balancer that is the default application load-balancer, denoted by `apps` in the URL. The default load-balancer can be configured in SAAP to be either publicly accessible over the internet, or only privately accessible over a pre-existing private connection. All application routes on the cluster are exposed on this default router load-balancer, including cluster services such as the logging UI, metrics API, and registry.

SAAP has an optional router/ingress load-balancer that is a secondary application load-balancer, denoted by `apps2` in the URL. The secondary load-balancer can be configured in SAAP to be either publicly accessible over the internet, or only privately accessible over a pre-existing private connection. If a 'Label match' is configured for this router load-balancer, then only application routes matching this label will be exposed on this router load-balancer, otherwise all application routes are also exposed on this router load-balancer.

SAAP has optional load-balancers for services that can be mapped to a service running on SAAP to enable advanced ingress features, such as non-HTTP/SNI traffic or the use of non-standard ports. Cloud providers may have a quota that limits the number of load-balancers that can be used within each cluster.

## Network use

Network use is not monitored, and is billed directly by the cloud provider.

## Cluster ingress

Project administrators can add route annotations for ingress control through IP allow-listing.

Ingress policies can also be changed by using `NetworkPolicy` objects.

All cluster ingress traffic goes through the defined load-balancers. Direct access to all nodes is blocked by cloud configuration.

## Cluster egress

`EgressNetworkPolicy` objects can control pod egress traffic to prevent or limit outbound traffic in SAAP.

Public outbound traffic from the control plane and infrastructure nodes is required and necessary to maintain cluster image security and cluster monitoring. This requires the `0.0.0.0/0` route to belong only to the internet gateway.
