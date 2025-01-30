# Helm Push

## Objectives

- Add `helm-push` task to PipelineRun.
- Define parameters, workspaces, and tasks within the PipelineRun for building and deploying your application.

## Key Results

- Successfully create and execute the Tekton PipelineRun using the defined `.tekton/pullrequest.yaml` file, enabling automated CI/CD processes for your application.
- Application helm chart os pushed to nexus

## Tutorial

### Create PipelineRun with Helm Push Task

You have already created a PipelineRun in the previous tutorial. Let's now add another task [`helm-push`](https://github.com/stakater-tekton-catalog/helm-push) to it.

1. Open up the PipelineRun file you created in the previous tutorial.
1. Now edit the file so the YAML becomes like the one given below.

    ```yaml
    {% include "https://raw.githubusercontent.com/NordMart/review-api/main/.tekton/helm_push.yaml" %}
    ```

    !!! note
        Remember to add the remote task in the annotations

1. Create a pull request with you changes. This should trigger the pipeline in the build namespace.

    ![helm-push](images/helm-push.png)

    ![helm-push](images/helm-push-logs.png)

Great! Let's add more tasks in our `pipelineRun` in coming tutorials.
