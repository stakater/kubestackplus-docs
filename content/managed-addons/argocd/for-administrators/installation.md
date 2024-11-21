# Installation

ArgoCD is installed as part of the SAAP addons.

## Installing OpenShift GitOps Operator Chart

ArgoCD will be installed seamlessly in your SAAP environment through the Red Hat OpenShift GitOps Operator. This operator simplifies the installation process by providing a standardized way to manage GitOps tooling, including ArgoCD.

During the installation process, a subscription will be created to install the GitOps Operator. This subscription ensures that you have access to the latest version of the operator and can receive updates and bug fixes seamlessly. The operator is responsible for managing the ArgoCD deployment and keeping it up to date.

In addition to the operator, an operator group is also installed. The operator group is used to define the scope and target namespace for the operator, allowing for effective management and control over the ArgoCD deployment within your OpenShift environment.

## Installing OpenShift GitOps Instance Chart

A GitOps Operator Instance Helm chart installs the instance for GitOps Operator. This Helm chart enables you to customize the behavior of the operator according to your specific requirements.

By using the GitOps Operator Instance Helm chart and customizing the ArgoCD Custom Resource, you have fine-grained control over the configuration and behavior of your ArgoCD instance. This empowers you to tailor ArgoCD to meet your specific deployment needs and ensures a highly efficient and secure continuous deployment workflow.
