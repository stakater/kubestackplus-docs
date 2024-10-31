# Creating a Pipeline

We will embark on a comprehensive journey through a complete pipeline, with each individual task covered in its tutorial. This approach aims to provide a detailed understanding of each task and how they collectively contribute to the functionality of pipeline-as-code.

In modern software development practices, pipelines play a crucial role in automating and streamlining the process of building, testing, and deploying applications. This tutorial will guide you through creating a pipeline using pipeline-as-code concepts. We'll focus on GitHub as the provider and assume you have a SAAP set up with pipeline-as-code capabilities.

Now that we have completed all the prerequisites to run this `pipelineRun`, we can continue by adding a pipeline to our application using `pipeline-as-code` approach.

## Objectives

- Create a Tekton PipelineRun using a `.tekton/pullrequest.yaml` file from a code repository.
- Define parameters, workspaces, and tasks within the PipelineRun for building and deploying your application.

## Key Results

- Successfully create and execute the Tekton PipelineRun using the defined `.tekton/pullrequest.yaml` file, enabling automated CI/CD processes for your application.

## Tutorial

### Create PipelineRun with Git Clone Task

Let's walk you through creating a Tekton `PipelineRun` using a `Pipeline-as-Code` approach.

1. Create a `.tekton` folder at the root of your repository.
1. Now add a file named `pullrequest.yaml` in this folder and place the below given content in it. This file will represent a `PipelineRun`.

   ```yaml
     {% include "https://raw.githubusercontent.com/NordMart/review-api/main/.tekton/git_clone.yaml" %}
   ```

1. Provide values for `image_registry`, and helm_registry parameters. You can find the urls from [here](../../../../managed-addons/nexus/explanation/routes.md).
   `image_registry` url should be succeeded by your application name. Example: nexus-docker-stakater-nexus.apps.lab.kubeapp.cloud/**review-api**

1. Now create a pull request on the repository with these changes. This should trigger a pipeline on your cluster.

1. You can go to your tenant's build namespace and see the pipeline running.

    ![git-clone](images/git-clone.png)

    ![git-clone-logs](images/git-clone-logs.png)

### Exploring the Git Clone Task

The Git Clone task serves as the initial step in your pipeline, responsible for fetching the source code repository. Let's break down the key components:

1. `name: fetch-repository`: This names the task, making it identifiable within the pipeline.

1. Task Reference (`taskRef`): The Git Clone task is referred to using the name git-clone, which corresponds to a Task defined in the Tekton Catalog. This task knows how to clone a Git repository.

1. Workspaces (`workspaces`): The task interacts with two workspaces;`output` and `ssh-directory`. The `output` workspace will store the cloned repository, while the `ssh-directory` workspace provides SSH authentication. This means that the private key stored in the secret `nordmart-ssh-creds` will be utilized during the cloning process.

1. Parameters `(params)`:

   `depth`: Specifies the depth of the Git clone. A value of "0" indicates a full clone.

   `url`: The URL of the source code repository. This parameter is dynamically fetched from the repo_url parameter defined in the PipelineRun.

   `revision`: The Git revision to fetch, often corresponding to a specific branch or commit. This parameter is also dynamically fetched from the `git_revision` parameter in the PipelineRun.

Great! Let's add more tasks in our pipelineRun in coming tutorials.
