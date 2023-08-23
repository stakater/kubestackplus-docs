# Creating a Pipeline Using Pipeline as Code

Now that we have added our first application using Stakater Opinionated GitOps Structure, we can continue by adding a pipeline to our application.

In modern software development practices, pipelines play a crucial role in automating and streamlining the process of building, testing, and deploying applications. This tutorial will guide you through creating a pipeline using pipeline-as-code concepts. We'll focus on GitHub as the provider and assume that you have a SAAP set up with pipeline-as-code capabilities.

## Objectives

- Configure SSH keys and secret for the pipeline.
- Create a Tekton PipelineRun using a `.tekton/main.yaml` file from a code repository.
- Define parameters, workspaces, and tasks within the PipelineRun for building and deploying your application.

## Key Results

- Successfully generate and configure an SSH secret to provide secure access to your code repository.
- Successfully create and execute the Tekton PipelineRun using the defined `.tekton/main.yaml` file, enabling automated CI/CD processes for your application.

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
