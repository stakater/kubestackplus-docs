# Overview

Stakater's App Agility Platform (SAAP) is a group of practices and tools that lets developers take control of and configure the entire cloud development loop. SAAP helps ship and scale containerized software faster and stay online 24x7 across Hybrid Cloud.

Stakater believes that Kubernetes is becoming the new foundation for compute and that over time, most applications will run on it in some form.

Organizations have adopted containers and Kubernetes to automate their applications operations and make their business applications portable, secure, easy to manage and scalable. While booting a Kubernetes cluster is fairly painless, a production grade Kubernetes environment can be complex, and require significant expertise to operate. Additionally managing an application platform on top of that is considerably challenging. Companies not only require an application stack for running their business processes, they need such an application stack to be configurable yet consistent and auditable, upgradable and DevOps enabled yet upgradable and cost-effective.

Companies require a solution with a justifiable return on their investment.

![Stakater App Agility Platform](./about/images/saap.jpg)

Stakater App Agility Platform is a fully managed enterprise Kubernetes platform. With Stakater App Agility Platform, innovators can focus on what matters, stay competitive, and outpace rising customer expectations without worrying about managing the underlying infrastructure.

With Stakater App Agility Platform, Stakater builds and manages your OpenShift clusters, allowing you to focus on your business. Stakater offers Stakater App Agility Platform for on-premises or your choice of public cloud allowing you to optimize your multi-cloud strategy that best suits your needs. Stakater App Agility Platform enables your teams across your organizations to consume OpenShift as a Service.

With Stakater App Agility Platform you can deploy a containerized, hybrid environment to meet digital business needs for running your mission critical systems.

## SAAP or bare Kubernetes?

SAAP is often referred to as "enterprise Kubernetes," but it can be hard to understand what that really means at first glance. Customers frequently ask, "SAAP or bare Kubernetes?" However, it's important to understand that SAAP already uses Kubernetes. In the overall SAAP architecture, Kubernetes provides both the foundation on which the SAAP platform is built and much of the tooling for running SAAP.

Kubernetes is an incredibly important open-source project—one of the key projects of the Cloud Native Computing Foundation and an essential technology in running containers.

However, the real question that potential users of SAAP might have is, "Can I just run my applications with Kubernetes alone?" Many organizations start by deploying Kubernetes and find that they can get a container, even an enterprise application, running in just a few days. However, as the Day-2 operations begin, security requirements arise, and more applications are deployed, some organizations find themselves falling into the trap of building their own platform as a service (PaaS) with Kubernetes technology. They add an open-source ingress controller, write a few scripts to connect to their continuous integration/continuous deployment (CI/CD) pipelines, and then try to deploy a more complex application... and that is when the problems start. If deploying Kubernetes were the tip of the iceberg, then the complexity of Day-2 management would be the hidden, vast, ship-sinking bulk of that same iceberg under the water.

While it's possible to start solving these challenges and problems, it often takes an operations team of several people, and several weeks and months of effort to build and maintain this "custom PaaS built on Kubernetes." This leads to inefficiency in the organization, complexity in supporting this from a perspective of security and certification, as well as having to develop everything from scratch when onboarding developer teams. If an organization were to list out all the tasks of building and maintaining this custom Kubernetes platform—that is, Kubernetes—with all the extra components needed to run containers successfully, they would be grouped up as follows:

- **Cluster management:** This includes installing OSes, patching the OS, installing Kubernetes, configuring CNI networking, authentication integration,
Ingress and Egress setup, persistent storage setup, hardening nodes, security patching, and configuring the underlying cloud/multicloud.
- **Application services:** These include log aggregation, health checks, performance monitoring, security patching, container registry, and setting up
the application staging process.
- **Developer integration:** This includes CI/CD integration, developer tooling/IDE integration, framework integration, middleware compatibility, providing
application performance dashboards, and RBAC.

While there are many more actions and technologies that could be added to the list—most of those activities are essential for any organization to seriously use containers—the complexity, time, and effort in just setting all of that up is insignificant to the ongoing maintenance of those individual pieces. Each integration needs to be thoroughly tested, and each component and activity will have a different release cycle, security policy, and patches.
