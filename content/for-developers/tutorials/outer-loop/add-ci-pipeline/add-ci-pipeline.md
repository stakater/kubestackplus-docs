# Creating a Pipeline Using Pipeline as Code

Now that we have added our first application using Stakater Opinionated GitOps Structure, we can continue by adding a pipeline to our application.

In modern software development practices, pipelines play a crucial role in automating and streamlining the process of building, testing, and deploying applications. This tutorial will guide you through creating a pipeline using pipeline-as-code concepts. We'll focus on GitHub as the provider and assume that you have a SAAP set up with pipeline-as-code capabilities.

## Objectives

- Obtain the necessary GitHub access credentials and permissions required for creating and integrating a pipeline-as-code setup.
- Obtain Interceptor URL from SAAP admin.
- Create Webhook Secret for your webhook security.
- Add webhook in your source code repository.
- Create a Secret to store your GitHub personal token and webhook secret.
- Define a Repository CRD that references the Kubernetes Secret for authentication.
- Establish a secure connection between your code repository and the CI/CD pipeline using a GitHub webhook.
- Create a Tekton PipelineRun using a `.tekton/main.yaml` file from a code repository.
- Understand the components and tasks defined in the PipelineRun.
- Define parameters, workspaces, and tasks within the PipelineRun for building and deploying your application.

## Key Results

- Personal Access Token (PAT) with the specified permissions is generated successfully in the GitHub account.
- Created a Kubernetes Secret named `github-webhook-config` containing your GitHub personal token and webhook secret.
- Defined a Repository CRD in your desired namespace, referencing the `github-webhook-config` Secret.
- Enabled a secure connection between your code repository and your CI/CD pipeline through the GitHub webhook.
- Successfully create SSH secret.
- Successfully create `pipelineRun`.

## Tutorial

### Configure GitHub Access

1. Generate a Fine-grained Token (PAT) on GitHub. PAT (Fine-grained): Allows you to select repositories from your GitHub organization that can use the token.[`Create a fine-grained token`](https://github.blog/2022-10-18-introducing-fine-grained-personal-access-tokens-for-github/) with the below-mentioned permissions for your source code repository:

    - Go to your GitHub account `settings`.
    - Navigate to `Developer settings` > `Personal access tokens`.
    - From drop-down select `Fine-grained Tokens`.
    - Click `Generate new token`.
    - Provide a name for the token.
    - Select the `Resource owner`.
    - Provide `Repository access` to this token.
    - Select the following scopes/permissions:

        - Administration (Read only)
        - Commit status (Read only)
        - Contents (Read only)
        - Metadata (Read only)
        - Pull requests (Read and write)
        - Webhook (Read and write)

    > Note: Save the token cautiously, you will need this to create a secret.

### Setting Up Webhook for Pipeline as Code

1. Begin by accessing the repository where you plan to set up the webhook. In your source code GitHub repository, locate and click on the `Settings` tab.

1. Within the repository settings, navigate to the `Webhooks` section. This is where you can manage and configure webhooks for your repository.

1. Click on the option to `Add a new webhook` to initiate the process of creating a new webhook for your repository.

1. To set up the webhook, you'll need the `URL of the Pipeline as Code interceptor`. This URL is used to connect GitHub with your SAAP's pipeline system.

1. Ask the SAAP admin to provide you with the `Interceptor URL` "route" from the project or namespace where the Pipeline as Code is installed.

1. Back in the GitHub repository's webhook settings, enter the `Pipeline as Code interceptor URL` you obtained in the previous step in the `Payload URL`.

1. Choose `Content type` as `application/json`.

1. Let's create a secret for our webhook to make it secure. Generate a random secret with this command.

    ```sh
    openssl rand -hex 20
    ```

    > Note: Save the secret because we will need it later.

    Now copy it and paste it under `Secret` section in Webhook.

1. Choose the specific events that should trigger the webhook. Click “Let me select individual events” and select the following events to trigger the webhook:

      - Commit status
      - Issue comments
      - Pushes
      - pull requests

1. Click on `Add webhook`/`Update webhook`.

    ![Webhook details](images/webhook-details.png)

    Once you've entered the interceptor URL and chosen the triggering events, proceed to add the webhook. This will establish the connection between your GitHub repository and SAAP pipeline.

### Create a Secret on SAAP

1. To create a secret first log in to SAAP using `oc` CLI.

1. Paste this command and replace `your-namespace` with your namespace, `provider.token` value with your PAT, and `webhook.secret` value with your webhook secret.

    ```sh
    oc -n <your-namespace> create secret generic github-webhook-config --from-literal provider.token="FINE_GRAINED_TOKEN_AS_GENERATED_PREVIOUSLY" --from-literal webhook.secret="SECRET_AS_SET_IN_WEBHOOK_CONFIGURATION"
    ```

1. Log in to SAAP and check if the secret is created in your targeted namespace.

    ![git webhook config](images/git-webhook.png)

    > Note: In older versions of PaC, webhook secret can't be stored, so for older versions, use the below command:

    ```sh
    oc -n <namespace-where-PaC-installed> create secret generic pipelines-as-code-secret --from-literal webhook.secret="$WEBHOOK_SECRET_AS_GENERATED"
    ```

    ![pipeline as code secret](images/pipeline-as-code.png)

### Define the Repository CRD

1. To create the `Repository` CRD, go to SAAP, beside your username you will see the (**+**) sign, click it.

    ![plus sign](images/plus-sign.png)

1. Now paste the below yaml, with the changes according to your needs.

    ```yaml
    apiVersion: "pipelinesascode..dev/v1alpha1"
    kind: Repository
    metadata:
      name: <name-of-repo>
      namespace: <your-namespace>
    spec:
      url: "https://<YOUR_GITHUB_REPO_URL>"
      git_provider:
        secret:
          name: "github-webhook-config"
       webhook_secret:
        name: "github-webhook-config"
    ```

    ![repository crd](images/repository-crd.png)

    Recheck the `Project` selected above and hit `Create`.

### Create PipelineRun Resource

Let's walk you through creating a Tekton `PipelineRun` using a `Pipeline-as-Code` approach. Create a `.tekton` folder and place it in the `pipelineRun` for your source code repository as `main.yaml`. This enables you to define and manage your pipelines along with your application code, promoting better code-pipeline integration and version control.

Since the `.tekton` folder containing your `pipelineRun` definition is part of your source code repository, you want to avoid including sensitive authentication information directly in the repository. Storing them as a secret allows you to version control your pipeline definition without exposing sensitive data.

1. Let's create SSH keys to access the repository.

    For SSH Access

    - [`Generate SSH Key Pair`](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent#generating-a-new-ssh-key)
    - [`Add Deploy Key to your Repository`](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/managing-deploy-keys#deploy-keys)

    > Note: A deploy key is specific to a single repository and cannot be used for multiple repositories.*

1. After adding the "public key" to the `Deploy keys` section of your repository, now is the time to add the "private key" in the secret.

    ```yaml
    apiVersion: v1
    kind: Secret
    metadata:
      name: nordmart-ssh-creds
      namespace: argocd
      labels:
        argocd.argoproj.io/secret-type: repository
    stringData:
      type: git
      url: git@github.com:argoproj/my-private-repository # Copy the SSH URL of your repo and paste it here
      sshPrivateKey: | # Paste base64 encoded private key here
        -----BEGIN OPENSSH PRIVATE KEY-----
        ...
        -----END OPENSSH PRIVATE KEY-----
    ```

    > Note: We will be using this secret in our `pipelineRun`

1. Let's place this `PipelineRun` in `.tekton/main.yaml` for your source code repository.

    ```yaml
    apiVersion: tekton.dev/v1beta1
    kind: PipelineRun
    metadata:
      name: main # pipelineRun name
      annotations:
        pipelinesascode.tekton.dev/on-event: "[push]" # Trigger the pipelineRun on push events on branch main
        pipelinesascode.tekton.dev/on-target-branch: "main"
        pipelinesascode.tekton.dev/task: "[https://raw.usercontent.com/stakater/tekton-catalog/main/stakater-create-git-tag/rendered/stakater-create-git-tag-0.0.7.yaml, git-clone]"
        # pipelineRun Tasks are fetching from our tekton-catalog repo where all the tasks are rendered
        pipelinesascode.tekton.dev/max-keep-runs: "2" # Only remain 2 latest pipelineRuns on SAAP
    spec:
      params:
        - name: repo_url
          value: "git@github.com:<YOUR-ORG>/<YOUR-REPO-NAME/" # Place your repo SSH URL
        - name: gitrevision
          value: {{revision}} # Dynamic variable to fetch branch name of the push event on your repo
        - name: repo_path
          value: {{repo_name}} # Dynamic varaible to fetch repo name
        - name: image_registry_url
          value: "<docker-registry-url>" # Place image registry URL without https://
        - name: helm_registry
          value: "<https://helm-registry-url>" # Place helm registry URL with https://
      pipelineSpec: # Define what parameters will be used for pipeline
        params:
          - name: repo_url
          - name: gitrevision
          - name: repo_path
          - name: image_registry_url
          - name: helm_registry
        workspaces: # Mention what workspaces will be used by this pipeline to store data and used by data transferring between tasks
          - name: source
          - name: ssh-directory
        tasks: # Mention what tasks will be used by this pipeline
          - name: fetch-repository #Name what you want to call the task
            taskRef:
              name: git-clone # Name of tasks mentioned in tekton-catalog
              kind: Task
            workspaces: # Mention what workspaces will be used by this task
              - name: output
                workspace: source
              - name: ssh-directory
                workspace: ssh-directory
            params: # Parameters will be used by this task
              - name: depth
                value: "0"
              - name: url
                value: $(params.repo_url)
              - name: revision
                value: $(params.gitrevision)
          - name: create-git-tag # Name what you want to call the task
            runAfter: # Created dependency so the below task will only run if fetch-repository will be suceeded
              - fetch-repository
            taskRef:
              name: stakater-create-git-tag-0.0.7 # Name of tasks mentioned in tekton-catalog
              kind: Task
            params: # Parameters will be used by this task
              - name: PR_NUMBER
                value: "NA"
              - name: GIT_REVISION
                value: $(params.gitrevision)
            workspaces: # Mention what workspaces will be used by this task
              - name: source
                workspace: source
              - name: ssh-directory
                workspace: ssh-directory
      workspaces: # Mention Workspaces configuration
        - name: source
          volumeClaimTemplate:
            spec:
              accessModes:
                - ReadWriteOnce
              resources:
                requests:
                  storage: 1Gi
        - name: ssh-directory # Using ssh-directory workspace for our task to have better security
          secret:
            secretName: nordmart-ssh-creds # Created this secret earlier
        - name: basic-auth
          secret:
            secretName: git-auth
    ```
