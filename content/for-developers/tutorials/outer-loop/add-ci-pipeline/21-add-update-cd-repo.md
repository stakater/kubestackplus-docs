# Update CD Repo

## Objectives

- Add `update-cd-repo` task to PipelineRun.
- Define parameters, workspaces, and tasks within the PipelineRun for building and deploying your application.

## Key Results

- Successfully create and execute the Tekton PipelineRun using the defined `.tekton/pullrequest.yaml` file, enabling automated CI/CD processes for your application.
- The GitOps Repository is updated

## Tutorial

### Create PipelineRun with Update CD Repo Task

You have already created a PipelineRun in the previous tutorial. Let's now add another task [`update-cd-repo`](https://github.com/stakater-tekton-catalog/github-update-cd-repo) to it.

1. Open up the PipelineRun file you created in the previous tutorial.
1. Now edit the file so the YAML becomes like the one given below.

    ```yaml
    {% include "https://raw.githubusercontent.com/NordMart/review-api/main/.tekton/update_cd_repo.yaml" %}
    ```

    !!! note
        Remember to add the remote task in the annotations

1. Remember to update the NAMESPACE and CD_REPO_URL parameter in the newly added task.

1. Create a pull request with you changes. This should trigger the pipeline in the build namespace.

    ![update-cd-repo](images/update-cd-repo.png)

    ![update-cd-repo](images/update-cd-repo-logs.png)

Great! Let's add more tasks in our pipelineRun in coming tutorials.
