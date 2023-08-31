# Creating a Pipeline Using Pipeline as Code

We will embark on a comprehensive journey through a complete pipeline, with each individual task covered in its own tutorial. This approach aims to provide a detailed understanding of each task and how they collectively contribute to the functionality of pipeline-as-code.

In modern software development practices, pipelines play a crucial role in automating and streamlining the process of building, testing, and deploying applications. This tutorial will guide you through creating a pipeline using pipeline-as-code concepts. We'll focus on GitHub as the provider and assume that you have a SAAP set up with pipeline-as-code capabilities.

Now that we have completed all the prerequisites to run this `pipelineRun`, we can continue by adding a pipeline to our application using `pipeline-as-code` approach.

## Objectives

- Create a Tekton PipelineRun using a `.tekton/main.yaml` file from a code repository.
- Define parameters, workspaces, and tasks within the PipelineRun for building and deploying your application.

## Key Results

- Successfully create and execute the Tekton PipelineRun using the defined `.tekton/main.yaml` file, enabling automated CI/CD processes for your application.

## Tutorial

### Create PipelineRun with Git Clone Task

Let's walk you through creating a Tekton `PipelineRun` using a `Pipeline-as-Code` approach. Create a `.tekton` folder and place it in the `pipelineRun` with the `git-clone` task for your source code repository as `main.yaml`. This enables you to define and manage your pipelines along with your application code, promoting better code-pipeline integration and version control.

1. Let's place this `PipelineRun` containing the `git-clone` task in `.tekton/main.yaml` for your source code repository.

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
          value: "git@github.com:<YOUR-ORG>/<YOUR-REPO-NAME>/" # Place your repo SSH URL
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

### Exploring the Git Clone Task

The Git Clone task serves as the initial step in your pipeline, responsible for fetching the source code repository. Let's break down the key components:

1. `name: fetch-repository`: This names the task, making it identifiable within the pipeline.

1. Task Reference (`taskRef`): The Git Clone task is referred to using the name git-clone, which corresponds to a Task defined in the Tekton Catalog. This task knows how to clone a Git repository.

1. Workspaces (`workspaces`): The task interacts with two workspaces;`output` and `ssh-directory`. The `output` workspace will store the cloned repository, while the `ssh-directory` workspace provides SSH authentication. This means that the private key stored in the secret `nordmart-ssh-creds` will be utilized during the cloning process.

1. Parameters `(params)`:

    `depth`: Specifies the depth of the Git clone. A value of "0" indicates a full clone.

    `url`: The URL of the source code repository. This parameter is dynamically fetched from the repo_url parameter defined in the PipelineRun.

    `revision`: The Git revision to fetch, often corresponding to a specific branch or commit. This parameter is also dynamically fetched from the gitrevision parameter in the PipelineRun.

Great! Let's add more tasks in our pipelineRun in coming tutorials.