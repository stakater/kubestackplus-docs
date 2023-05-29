# Networking

## Custom Domains for applications

To use a custom hostname for a route, you must update your DNS provider by creating a canonical name (CNAME) record. Your CNAME record should map the SAAP canonical router hostname to your custom domain. The SAAP canonical router hostname is shown on the Route Details page after a Route is created. Alternatively, a wildcard CNAME record can be created once to route all subdomains for a given hostname to the cluster's router.

## Custom domains for cluster services

Custom domains and subdomains for cluster services are available except for the SAAP service routes, for example, the API or web console routes, or for the default application routes.

## Domain validated certificates

SAAP includes TLS security certificates needed for both internal and external services on the cluster. For external routes, there are two, separate TLS wildcard certificates that are provided and installed on each cluster, one for the web console and route default hostnames and the second for the API endpoint. Let's Encrypt is the certificate authority used for certificates. Routes within the cluster, for example, the internal API endpoint, use TLS certificates signed by the cluster's built-in certificate authority and require the CA bundle available in every pod for trusting the TLS certificate.

## Load-balancers

## Network use

Network use is not monitored, and is billed directly by the cloud provider.

## Cluster ingress

Project administrators can add route annotations for ingress control through IP allowlisting.

Ingress policies can also be changed by using `NetworkPolicy` objects.

All cluster ingress traffic goes through the defined load balancers. Direct access to all nodes is blocked by cloud configuration.

## Cluster egress

`EgressNetworkPolicy` objects can control pod egress traffic to prevent or limit outbound traffic in SAAP.

Public outbound traffic from the control plane and infrastructure nodes is required and necessary to maintain cluster image security and cluster monitoring. This requires the `0.0.0.0/0` route to belong only to the internet gateway.
