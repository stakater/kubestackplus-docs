# Securely Storing SSH Keys for Tekton PipelineRun

When working with Tekton Pipelines and storing your pipeline definition in a `.tekton` folder within your source code repository, it's important to keep sensitive authentication information, such as SSH keys, secure and separate from the public codebase. In this tutorial, you will learn how to securely store SSH keys using Secrets to access your code repository within your Tekton PipelineRun.

## Objectives

- Generate SSH keys to securely access your code repository.
- Add your public key as a deploy key in your GitHub repository.
- Store the private SSH key in Secret to be used by your Tekton PipelineRun.

## Key Results

- Successfully generate a pair of SSH keys for repository access.
- Set up the public SSH key as a deploy key in your GitHub repository.
- Create a Secret containing the private SSH key for Tekton PipelineRun.

## Tutorial

1. Let's create SSH keys to access the repository.

    For SSH Access:

    - [`Generate SSH Key Pair`](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent#generating-a-new-ssh-key)

1. Add your `public-key` into the `Deploy key` section of your repository:

    - [`Add Deploy Key to your Repository`](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/managing-deploy-keys#deploy-keys)

    > Note: A deploy key is specific to a single repository and cannot be used for multiple repositories.*

    After adding the `Deploy keys` in your repository, now is the time to add the secret.

1. Copy the below `secret` yaml.

    ```yaml
    apiVersion: v1
    kind: Secret
    metadata:
      name: nordmart-ssh-creds # Name of Secret
      namespace: <your-namespace> # Place your namespace where you want to run the pipeline
    stringData:
      type: git
      sshPrivateKey: | # Paste your private key here as it is, the sshPrivateKey value will be base64 encoded in the secret. You do not need to manually encode the value before creating the secret.
        -----BEGIN OPENSSH PRIVATE KEY-----
        ...
        -----END OPENSSH PRIVATE KEY-----
    ```

1. Log in to SAAP, go to Administrator > Workloads > Secrets. Create a secret with yaml.

    ![secret with yaml](images/secret-yaml.png)

1. Paste the `secret yaml`, add your `private key`, and your `namespace` then hit `Create`.

    ![create ssh secret](images/create-ssh-secret.png)

    Now look at the `nordmart-ssh-creds` secret yaml, the private key will be encoded to `base64`.

    ![ssh secret](images/nordmart-ssh.png)

    > Note: We will be using this secret in our `pipelineRun`.

Cool! Let's move on to the next tutorial and create a pipeline.
