# StackRox Image Check

## Objectives

- Add `rox-image-check` task to PipelineRun.
- Define parameters, workspaces, and tasks within the PipelineRun for building and deploying your application.

## Key Results

- Successfully create and execute the Tekton PipelineRun using the defined `.tekton/pullrequest.yaml` file, enabling automated CI/CD processes for your application.

## Tutorial

### Create PipelineRun with Rox Image Check Task

You have already created a PipelineRun in the previous tutorial. Let's now add another task [`rox-image-check`](https://github.com/stakater-tekton-catalog/rox-image-check) to it.

1. Open up the PipelineRun file you created in the previous tutorial.
1. Now edit the file so the YAML becomes like the one given below.

    ```yaml
      {% include "https://raw.githubusercontent.com/NordMart/review-api/main/.tekton/rox_image_check.yaml" %}
    ```

   !!! note
       Remember to add the remote task in the annotations
       ![rox-image-check](images/rox-image-check-annotation.png)

1. Create a pull request with you changes. This should trigger the pipeline in the build namespace.

   ![rox-image-check](images/rox-image-check.png)

   ![rox-image-check-logs](images/rox-image-check-logs.png)

Great! Let's add more tasks in our pipelineRun in coming tutorials.
