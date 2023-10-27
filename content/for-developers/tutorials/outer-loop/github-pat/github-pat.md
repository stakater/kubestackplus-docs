# Configure SCM (GitHub) Access

In this section, you'll learn how to configure GitHub access by generating a Fine-grained Personal Access Token (PAT) and securely storing it as a secret in Vault. These steps are essential for establishing a secure and automated Continuous Integration/Continuous Deployment (CI/CD) pipeline using pipeline-as-code concepts.

A Fine-grained PAT ensures that your CI/CD pipeline can securely interact with your GitHub repositories. By generating a token with finely controlled permissions, you grant the pipeline only the specific access it requires, reducing potential security risks. Additionally, storing the PAT in Vault adds an extra layer of security to protect your credentials.

## Objectives

- Generate a Fine-grained PAT with the necessary permissions for pipeline integration.
- Securely store the GitHub PAT in Vault for added protection.

## Key Results

- Personal Access Token (PAT) with the specified permissions is generated successfully in the GitHub account.
- The GitHub PAT is securely stored in Vault and can be accessed only by authorized entities, enhancing security.

## Tutorial

### Generate Token (PAT) on GitHub

1. Generate a Fine-grained Token (PAT) on GitHub. PAT (Fine-grained): Allows you to select repositories from your GitHub organization that can use the token.[`Create a fine-grained token`](https://github.blog/2022-10-18-introducing-fine-grained-personal-access-tokens-for-github/) with the below-mentioned permissions for your source code repository:

    - Go to your GitHub account `settings` for the top-right corner on your profile.

    <div style="text-align:center"><img src="images/git-account-settings.png" /></div>

    - Navigate to `Developer settings`

        <div style="text-align:center"><img src="images/developer-settings.png" /></div>

    - Go to `Personal access tokens`.
    - From drop-down select `Fine-grained Tokens`.
    - Click `Generate new token`.

    <div style="text-align:center"><img src="images/pat-create.png" /></div>

    - Provide a name for the token.
    - Select the `Resource owner`(your organization).
    - Provide `Repository access` (source code repository) to this token.
    - Select the following scopes/permissions:

        - Administration (Read only)
        - Commit status (Read only)
        - Contents (Read only)
        - Metadata (Read only)
        - Pull requests (Read and write)
        - Webhook (Read and write)

    <div style="text-align:center"><img src="images/pat-permissions.png" /></div>

    !!! note
        > Save the token cautiously, you'll need to save it in `Vault` in upcoming tutorials.

Congratulations! You have successfully configured GitHub access. Let's move to next tutorial.
