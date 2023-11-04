# How many clusters are needed?

Numerous deployment patterns exist for Kubernetes, and a frequently asked question pertains to determining the optimal number of clusters for an organization. While the answer to this question largely depends on the organization's specific needs and goals, the subsequent paragraphs offer valuable guidance to assist you in arriving at the right cluster count.

## Life cycle stages: development, testing, production

In the realm of enterprise IT systems, it's common for organizations of varying sizes to implement life cycle stages, sometimes referred to as a staging pattern. Among these stages, the three most frequently encountered are development, testing, and production. This multi-stage approach allows organizations to thoroughly evaluate and refine applications and deployments in a controlled setting before introducing changes into the production environment. The recommended staging pattern typically involves the use of at least three distinct SAAP clusters:

**1. Development:** This stage serves as a testing ground for developers and operators, where experimentation is encouraged. It's preferable to have multiple small, short-lived clusters for creating and frequently discarding tests, although a single "sandbox" cluster can also be used.

**2. Testing:** In this stage, anticipated cluster modifications such as patches or configuration changes undergo thorough testing and validation before being deployed to the production environment. Some organizations also refer to this stage as "preproduction," though preproduction may exist as a separate environment as well.

**3. Production:** The production stage is where the organization's actual applications run, serving as the live operational environment.

Furthermore, some organizations may incorporate additional environments, such as integration testing environments, but the optimal number of staging environments for your organization ultimately depends on your specific needs. If you're uncertain, consider examining common deployment patterns in similar enterprise applications. 

In cases where SAAP is employed for non-critical applications, it may be acceptable to streamline your setup to just two clusters (combining development and testing) or even a single cluster encompassing development, testing, and production. This approach offers cost-efficiency and minimizes the overall cluster management workload. When utilizing a single cluster, administrators can choose to utilize separate namespaces for development, testing, and production. However, single-cluster deployment has its drawbacks:

- Changes that impact the entire cluster, such as software patches, could potentially introduce issues in the production environment that might have been identified and prevented in a dedicated testing environment.

- Unexpected behavior in testing or development environments, such as excessive container generation or excessive disk space usage, can lead to problems in the production environment.

We cannot give you a precise number of clusters that will work perfectly in your situation; as previously mentioned, it makes sense to look at similar enterprise applications in your organization to see how many life cycle stages are being used.

## Business continuity, disaster recovery, and failover

In addition to the standard staging environments, many organizations opt to establish a failover production environment, commonly referred to as Disaster Recovery (DR). This failover production environment serves as a safeguard in the event of a catastrophic failure that disrupts the entire cluster or cloud region. Typically, this DR setup is deployed in a different cloud region compared to the primary production cluster.

The SAAP offers a Service-Level Agreement (SLA) of 99.5%, which is deemed acceptable for many business-critical applications. However, some applications may necessitate a higher SLA. It's crucial to assess whether your application demands a service level exceeding 99.5% or if this level suffices for your specific needs.

If a higher level of service availability, such as 99.999%, is required, you can achieve it by calculating a composite SLA through the simultaneous operation of multiple SAAP clusters. These clusters can be located within the same region or across multiple regions to attain even greater availability. 
