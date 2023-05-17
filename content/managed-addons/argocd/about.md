# ArgoCD

## Overview

ArgoCD is a declarative, GitOps continuous delivery tool designed to simplify and automate application deployments on Kubernetes clusters. It enables you to define the desired state of your applications and infrastructure in a Git repository, providing a robust and scalable approach to managing and deploying your applications across multiple environments.

We use GitOps to continuously deliver application changes

[Argo CD](https://argoproj.github.io/argo-cd/) is a declarative, GitOps continuous delivery tool for Kubernetes. The deployment environment is a namespace in a container platform.

Argo CD models a collection of applications as a project and uses a Git repository to store the application's desired state.

Argo CD is flexible in the structure of the application configuration represented in the Git repository.

Argo CD supports defining Kubernetes manifests in a number of ways:

- Helm charts
- Kustomize
- ksonnet
- jsonnet
- plain directory of yaml/json manifests
- custom plugins

Argo CD compares the actual state of the application in the cluster with the desired state defined in Git and determines if they are out of sync. When it detects the environment is out of sync, Argo CD can be configured to either send out a notification to kick off a separate reconciliation process or Argo CD can automatically synchronize the environments to ensure they match.

### Benefits
ArgoCD offers a wide range of powerful features that help streamline your continuous delivery workflow:

1. **Declarative GitOps:** ArgoCD operates based on the GitOps principles, allowing you to define and version your application configurations in Git repositories. This declarative approach ensures consistency and reproducibility across different environments.

2. **Automated Deployments:** ArgoCD automates the deployment process, continuously monitoring your Git repositories for changes and automatically applying the updates to your Kubernetes clusters. This eliminates the need for manual intervention and reduces the risk of human error.

3. **Multi-Cluster and Multi-Tenancy:** ArgoCD supports managing multiple Kubernetes clusters and enables you to define different sets of applications and configurations for each cluster. It also provides support for multi-tenancy, allowing you to securely manage applications across different teams or organizations.

4. **Rollbacks and Rollouts:** With ArgoCD, you can easily roll back to previous application versions or progressively roll out new versions using strategies like blue-green or canary deployments. This gives you the flexibility to test changes and ensure a smooth transition without affecting the stability of your applications.

5. **Application Synchronization and Health Monitoring:** ArgoCD continuously monitors the state of your applications and performs synchronization to ensure that the desired state matches the actual state. It provides detailed insights into the health of your applications, helping you identify and resolve issues quickly.

6. **RBAC and Access Controls:** ArgoCD offers robust Role-Based Access Control (RBAC) mechanisms, allowing you to define granular permissions for different users or teams. This ensures that only authorized individuals can modify or deploy applications, maintaining the security and integrity of your deployments.

### SLAs

**Availability:**
We understand the importance of high availability for continuous deployment. We guarantee a minimum monthly uptime percentage of 99.9% for the ArgoCD platform integrated into our product. This ensures that the ArgoCD service remains accessible, allowing you to effectively manage and deploy your applications without significant disruptions.

**Performance:**
Efficient performance is crucial for a smooth continuous deployment experience. Our product, powered by ArgoCD, is committed to delivering optimal performance. We guarantee an average response time of 500 milliseconds or less for typical deployment operations. This ensures that your deployment processes remain fast and responsive, facilitating efficient application delivery.

**Deployment:**
We strive to ensure successful and timely application deployments using ArgoCD. While specific deployment times can vary depending on factors such as application complexity and cluster resources, we commit to providing a reasonable deployment timeframe. Rest assured, we work diligently to minimize any delays and facilitate timely application updates.

**Support:**
We are dedicated to providing exceptional support to our customers throughout their continuous deployment journey. Our support team is available to assist you with any issues or questions related to using ArgoCD in our product. For non-emergency requests, we commit to responding within one business day. In the case of critical issues that impact the deployment process or availability, we prioritize rapid response times to minimize any potential disruptions.

**Service Maintenance:**
To ensure the stability and security of our product, periodic maintenance activities may be necessary. We make every effort to schedule maintenance windows during off-peak hours to minimize any impact on your continuous deployment processes. Prior notice will be provided regarding any scheduled maintenance, allowing you to plan accordingly.



### Terminology

Argo CD uses a number of terms to refer to the components:

- Application: A deployable unit
- Project: A collection of applications that make up a solution

### Access

ArgoCD can be accessed via Forecastle. 

1. Open Forecastle > Navigate to CI & CD and Click the ArgoCD tile.

<Add image here>

Search argocd in search bar and Open the ArgoCD link.

Architecture? Ask Tehreem. hub->spoke 




**CPU Requirements:** 
**Memory Requirements:** 
**Storage Requirements:** 


infra gitops and app-gitops are created and are part of tenant (prereq, mention docs)

### Updates

saap addons mai gtops ka chart hai, uske resources subscription and operatorgroup (brief intro)
helm chart that we use in saap

added to dominator chart

2 types of charts

1. gitops operator 
2. gitops oeprator config (attach urls)

brief overview of content

for admin:
How to:
openshift-gitops namespace mai route se open argocd, along with forecastle

How to add secrets for a repo (ESO plus vault)

argocd CR settings can be customised. gitops-operator=config chart can customised config for argocd CR. 
https://github.com/stakater-ab/saap-addons-charts/blob/main/stakater/gitops-operator-config/values.yaml

dominator appset upgrades this^

https://github.com/stakater-ab/saap-addons/blob/5abf6bf7d4c9ae8a7ff59ca15ae1674219a94437/dominator/helm/Chart.yaml#L40

customize
https://github.com/stakater-ab/saap-gitops-prod/blob/main/stakater/stakater-prod/application-sets/dominator/stakater-prod-dominator-addons-appset.yaml#L95-L181



all apps in apps-gitops should contain apps in argocd dashboard

2 separate instances, for dev and for operations