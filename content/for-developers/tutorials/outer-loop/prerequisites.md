# Prerequisites

Before you embark on setting up your pipeline as code, it's essential to ensure that you have all the necessary prerequisites in place. These prerequisites are the foundation for a successful and secure automation process. Below, we've listed the key prerequisites you'll need to consider:

## [Add an Environment to an Application](./add-build-environment/add-environment.md)

In certain cases, you may need to add a new environment to an existing application within a tenant. For example, when incorporating a production cluster into your infrastructure, you'll want to extend your application's deployment capabilities to this new environment. Ensure you have a clear understanding of how to add and configure this environment to your application as part of your prerequisites.

## [Personal Access Token (PAT)](./add-ci-pipeline/04-configure-github-access.md)

A Personal Access Token (PAT) is an essential component for ensuring secure and authenticated interactions with your code repositories. This token serves as a vital bridge between your pipeline and your version control system, allowing it to access and manage your code repositories. Whether it's for fetching code, creating branches, or managing pull requests, this token is the cornerstone of performing Git operations securely.

## [SSH Keys for Repository Access](./github-ssh/github-ssh.md)

SSH keys play a crucial role in ensuring secure access to your code repositories, particularly when employing version control systems. These cryptographic keys provide a secure means for your pipeline to authenticate itself with your version control system, allowing it to perform tasks like cloning repositories, pushing changes, and managing version-controlled code with the highest level of security and trust.
Steps to Generate SSH Keys:
Open a terminal or command prompt on your local machine.

## Vault for Secure Credential Storage

Vault serves as an indispensable component for securely safeguarding and managing the key credentials that your pipeline relies upon. Access to a Vault instance is imperative, as it is the secure repository for your sensitive data. Furthermore, a strong command of creating and effectively managing secrets within Vault is paramount to ensure the security and integrity of your pipeline, enabling you to confidently manage and utilize credentials while upholding best practices in secret management.

## External Secrets Custom Resources (CRs)

External Secrets Custom Resources (CRs) play a pivotal role in securely referencing and efficiently managing secrets stored within Vault. The creation of these CRs within your Kubernetes cluster is a necessary step in empowering your pipeline to access the essential secrets securely. These CRs serve as the bridge between your Kubernetes environment and Vault, ensuring a seamless and secure flow of sensitive data to fulfill the requirements of your pipeline. By creating and configuring External Secrets CRs, you establish a robust foundation for secret management, enhancing the overall security and reliability of your pipeline operations.

## Access to ArgoCD Applications

To deploy and manage your applications effectively with ArgoCD, it's essential to have the required access to ArgoCD applications within your SAAP (Stakater App Agility Platform). Ensure that you possess the necessary permissions and access rights that empower you to not only create but also update and synchronize ArgoCD applications. This access ensures that you can confidently orchestrate the deployment and continuous synchronization of your applications while maintaining security and compliance standards within SAAP.

With these prerequisites in place, you'll be well-prepared to set up your pipeline as code and run it securely and efficiently.
