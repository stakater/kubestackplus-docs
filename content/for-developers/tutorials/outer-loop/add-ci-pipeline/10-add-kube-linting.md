# Kube Linting

## Objectives

- Add `kube-liting` task to PipelineRun.
- Define parameters, workspaces, and tasks within the PipelineRun for building and deploying your application.

## Key Results

- Successfully create and execute the Tekton PipelineRun using the defined `.tekton/pullrequest.yaml` file, enabling automated CI/CD processes for your application.
- Linting is performed on application's Helm Chart.

## Tutorial

### Create PipelineRun with Kube Linting Task

You have already created a PipelineRun in the previous tutorial. Let's now add another task [`kube-linting`](https://github.com/stakater-tekton-catalog/kube-linting) to it.

1. Open up the PipelineRun file you created in the previous tutorial.
1. Now edit the file so the YAML becomes like the one given below.

    ```yaml
      {% include "https://raw.githubusercontent.com/NordMart/review-api/main/.tekton/kube_linting.yaml" %}
    ```

    !!! note
        Remember to add the remote task in the annotations
        ![Kube-linting](images/kube-linting-annotation.png)

1. Create a pull request with you changes. This should trigger the pipeline in the build namespace.

    ![Kube-linting](images/kube-linting.png)

    ![Kube-linting-logs](images/kube-linting-logs.png)

Great! Let's add more tasks in our pipelineRun in coming tutorials.
