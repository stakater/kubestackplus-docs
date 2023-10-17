# Why Create External Secret CRs?

External Secret Custom Resources (CRs) serve a crucial role in securing sensitive data and simplifying secret management in Kubernetes. They offer the following advantages:

- **Enhanced Security**: External Secrets abstract sensitive data from your application configuration, reducing the risk of exposure.

- **Dynamic Secret Management**: Secrets can be updated externally, enabling dynamic secret management without modifying application configurations.

- **Simplified Application Configuration**: Using External Secrets simplifies application configuration by referencing secrets rather than storing them directly.

- **Centralized Management**: You can centralize secret management, streamlining rotations and revocations.

## Creating External Secret CRs via ArgoCD

To create External Secret CRs in your Kubernetes cluster, you can leverage ArgoCD, a GitOps tool. Here's how it works:

1. **Define External Secret CRs**: Create External Secret CRs in YAML format, specifying the secret's name, namespace, backend type, and data mapping.

1. **External Secret Storage**: Store secrets externally in a secret management tool, such as HashiCorp Vault.

3. **ArgoCD Application Definition**: Define an ArgoCD Application in your Git repository, including references to the External Secret CRs.

4. **GitOps Workflow**: When you push changes to your repository, ArgoCD synchronizes the cluster with the desired state, creating or updating External Secret CRs as needed.

5. **Secret Mapping**: The External Secret CRs in the cluster map to actual secrets stored in the external secret management tool, ensuring that the application has access to the necessary secrets.

By using ArgoCD's GitOps workflow, you can create and maintain External Secret CRs, abstract sensitive data, and enhance security without modifying your application code.
