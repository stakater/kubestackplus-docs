# Overview

ArgoCD is a declarative, GitOps continuous delivery tool designed to simplify and automate application deployments on Kubernetes clusters. It enables you to define the desired state of your applications and infrastructure in a Git repository, providing a robust and scalable approach to managing and deploying your applications across multiple environments.

We use GitOps to continuously deliver application changes

[ArgoCD](https://argoproj.github.io/argo-cd/) is a declarative, GitOps continuous delivery tool for Kubernetes. The deployment environment is a namespace in a container platform.

ArgoCD models a collection of applications as a project and uses a Git repository to store the application's desired state.

Argo CD is flexible in the structure of the application configuration represented in the Git repository.

Argo CD supports defining Kubernetes manifests in a number of ways:

- Helm charts
- Kustomize
- ksonnet
- jsonnet
- plain directory of yaml/json manifests
- custom plugins

ArgoCD compares the actual state of the application in the cluster with the desired state defined in Git and determines if they are out of sync. When it detects the environment is out of sync, ArgoCD can be configured to either send out a notification to kick off a separate reconciliation process or ArgoCD can automatically synchronize the environments to ensure they match.

## Benefits

ArgoCD offers a wide range of powerful features that help streamline your continuous delivery workflow:

1. **Declarative GitOps:** ArgoCD operates based on the GitOps principles, allowing you to define and version your application configurations in Git repositories. This declarative approach ensures consistency and reproducibility across different environments.

1. **Automated Deployments:** ArgoCD automates the deployment process, continuously monitoring your Git repositories for changes and automatically applying the updates to your Kubernetes clusters. This eliminates the need for manual intervention and reduces the risk of human error.

1. **Multi-Cluster and Multi-Tenancy:** ArgoCD supports managing multiple Kubernetes clusters and enables you to define different sets of applications and configurations for each cluster. It also provides support for multi-tenancy, allowing you to securely manage applications across different teams or organizations.

1. **Rollbacks and Roll outs:** With ArgoCD, you can easily roll back to previous application versions or progressively roll out new versions using strategies like blue-green or canary deployments. This gives you the flexibility to test changes and ensure a smooth transition without affecting the stability of your applications.

1. **Application Synchronization and Health Monitoring:** ArgoCD continuously monitors the state of your applications and performs synchronization to ensure that the desired state matches the actual state. It provides detailed insights into the health of your applications, helping you identify and resolve issues quickly.

1. **RBAC and Access Controls:** ArgoCD offers robust Role-Based Access Control (RBAC) mechanisms, allowing you to define granular permissions for different users or teams. This ensures that only authorized individuals can modify or deploy applications, maintaining the security and integrity of your deployments.

## SLAs

**Availability:**
We understand the importance of high availability for continuous deployment. We guarantee a minimum monthly uptime percentage of 99.9% for the ArgoCD platform integrated into our product. This ensures that the ArgoCD service remains accessible, allowing you to effectively manage and deploy your applications without significant disruptions.

**Performance:**
Efficient performance is crucial for a smooth continuous deployment experience. Our product, powered by ArgoCD, is committed to delivering optimal performance. We guarantee an average response time of 500 milliseconds or less for typical deployment operations. This ensures that your deployment processes remain fast and responsive, facilitating efficient application delivery.

**Deployment:**
We strive to ensure successful and timely application deployments using ArgoCD. While specific deployment times can vary depending on factors such as application complexity and cluster resources, we commit to providing a reasonable deployment time frame. Rest assured, we work diligently to minimize any delays and facilitate timely application updates.

**Support:**
We are dedicated to providing exceptional support to our customers throughout their continuous deployment journey. Our support team is available to assist you with any issues or questions related to using ArgoCD in our product. For non-emergency requests, we commit to responding within one business day. In the case of critical issues that impact the deployment process or availability, we prioritize rapid response times to minimize any potential disruptions.

**Service Maintenance:**
To ensure the stability and security of our product, periodic maintenance activities may be necessary. We make every effort to schedule maintenance windows during off-peak hours to minimize any impact on your continuous deployment processes. Prior notice will be provided regarding any scheduled maintenance, allowing you to plan accordingly.

## Terminology

Argo CD uses a number of terms to refer to the components:

- **Application:** In Argo CD, an application refers to a deployable unit that you want to manage and deploy in a Kubernetes cluster. It represents a specific workload, such as a microservice, a database, or any other application component that needs to be deployed. An application in Argo CD is defined using a YAML manifest file that describes its desired state, including the source code, deployment configuration, and any other resources required.

- **Project:** A project in Argo CD is a logical grouping of applications that collectively form a solution or an application suite. It allows you to organize and manage multiple applications together. Projects provide a way to define access control policies and permissions at a higher level, allowing you to control who can deploy, modify, or view specific sets of applications. By grouping applications into projects, you can manage them as a cohesive unit with shared policies and settings
