# Overview

The "For Delivery Engineer" section focuses on providing information tailored explicitly for delivery engineers involved in GitOps-based application delivery.
The primary goal of this section is to enable the developers to set up their CI-CD workflows. The delivery engineer is expected to have elevated permissions over their organization in their SCM provider to be able to create tokens and SSH keys.
In this section, we will create the two repositories that are required for our CI-CD workflow. Later we will generate Tokens and SSH keys for accessing these repositories.

We manage GitOps with two different kinds of repository with different purpose enlisted below:

- **`Apps GitOps Config`**: Used for delivering applications belonging to tenants.
- **`Infra GitOps Config`**: Used for delivering cluster scoped resources for application tenants or other services.

You can pick any name for these two repositories as long as they explain the purpose well.

This section is divided into three main parts: Explanations, How-to-Guides, and Tutorials.

## Explanation

The explanation contains all the required details that answer the obvious queries; to begin with:

- [GitOps for Application Delivery](./explanation/gitops-intro.md): This chapter provides an overview of the GitOps methodology in the context of application delivery and how GitOps is different from DevOps.

- [Stakater Opinionated GitOps Structure](./explanation/gitops-structure.md): This chapter introduces Stakater's opinionated GitOps structure. It explains how Stakater recommends organizing the GitOps repositories, directory structure, and naming conventions for managing infrastructure and application configurations with the deployment manifests.

- [Types of Environments](./explanation/types-of-environments.md): This chapter explores different environments involved in Stakater's application delivery.

- [Stakater Tekton Chart](./explanation/stakater-tekton-chart.md): This chapter focuses on Stakater's Tekton Chart, which is a Helm chart designed to streamline the configurations and components needed by Tekton pipelines for building efficient CI/CD.

- [Frequently Asked Questions](./explanation/faq.md): This chapter addresses common questions and concerns related to GitOps-based application delivery.

## How-to guides

The How-to Guides section offers practical guides that provide detailed instructions. The chapters included are:

- [Add Cluster Task](./how-to-guides/add-a-cluster-task/add-cluster-task.md): This guide walks the delivery engineer through the process of adding a cluster task to the Tekton pipeline.

- [Configure Repository Secret for ArgoCD](./how-to-guides/configure-repository-secret/configure-repository-secret.md): This guide focuses on configuring repository secrets specifically for Infra and Apps GitOps repositories.

- [Use A Cluster Task in Pipeline](./how-to-guides/use-a-cluster-task-in-pipeline/use-a-clustertask-in-pipeline.md): As the name suggests, this chapter will walk you through all the information and necessary steps to add a cluster task into your pipeline.

## Tutorials

The Tutorials section provides step-by-step instructions for performing specific tasks related to GitOps-based application delivery. The chapters included are:

- [Configure Infra GitOps repository](./tutorials/01-configure-infra-gitops-config/configure-infra-gitops-repo.md): This tutorial guides the delivery engineer on configuring the infrastructure GitOps repository, including setting up the repository, aligning directories and files structure, adding the tenant and ArgoCD applications.

- [Configure Apps GitOps repository](./tutorials/02-configure-apps-gitops-config/configure-apps-gitops-repo.md): This tutorial focuses on configuring the application-specific GitOps repository. It covers topics such as repository setup, aligning directories and files structure, application deployment manifests, and linking of Infra and Apps GitOps repositories.

- [Deploy demo app](./tutorials/03-deploy-demo-app/deploy-demo-app.md): This tutorial walks the delivery engineer through the process of deploying a demo application using Stakater's GitOps techniques. It covers steps like building and pushing of application image, creating an application chart, and pushing it to the helm repository.
