# Secure Connection using SSH Keys for Tekton PipelineRun

When collaborating with Tekton Pipelines and housing your pipeline configurations within a `.tekton` directory in your source code repository, it's imperative to uphold security by isolating sensitive authentication information, like SSH keys, from the public codebase. In this tutorial, you'll be creating SSH Keys and generating the access between a pipeline and code Repository.

## Objectives

- Generate SSH keys to securely access your code repository.
- Add your public key as a deploy key in your GitHub repository.

## Key Results

- Successfully generate a pair of SSH keys for repository access.
- Set up the public SSH key as a deploy key in your GitHub repository.

## Tutorial

1. Let's create SSH keys to access both source code and GitOps repositories.

    For SSH Access:

    - [`Generate SSH Key Pair`](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent#generating-a-new-ssh-key)

1. Add your `public-key` into the `Deploy key` section of your repositories:

    - [`Add Deploy Key to your Repository`](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/managing-deploy-keys#deploy-keys)

    > Note: A deploy key is specific to a single repository and cannot be used for multiple repositories.
    > Save the keys cautiously, you'll need them to save in `Vault` in upcoming tutorials.

Cool! Let's move on to the next tutorial and store the credentials in Vault.
