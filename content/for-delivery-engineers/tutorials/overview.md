# Overview

In this section, we will create the two repositories that are required for our CI-CD workflow. Later we will generate Tokens and SSH keys for accessing these repositories.

We manage GitOps with two different kinds of repository with different purpose enlisted below:

- **`Apps GitOps Config`**: Used for delivering applications belonging to tenants.
- **`Infra GitOps Config`**: Used for delivering cluster scoped resources for application tenants or other services.

You can pick any name for these two repositories as long as they explain the purpose well.
