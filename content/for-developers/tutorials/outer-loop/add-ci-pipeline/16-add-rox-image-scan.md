# StackRox Image Scan

## Objectives

- Add `rox-image-scan` task to PipelineRun.
- Define parameters, workspaces, and tasks within the PipelineRun for building and deploying your application.

## Key Results

- Successfully create and execute the Tekton PipelineRun using the defined `.tekton/pullrequest.yaml` file, enabling automated CI/CD processes for your application.
- Application Image is scanned.

## Tutorial

### Create PipelineRun with Rox Image Scan Task

You have already created a PipelineRun in the previous tutorial. Let's now add another task [`rox-image-scan`](https://github.com/stakater-tekton-catalog/rox-image-scan) to it.

1. Open up the PipelineRun file you created in the previous tutorial.
1. Now edit the file so the YAML becomes like the one given below.

    ```yaml
      {% include "https://raw.githubusercontent.com/NordMart/review-api/main/.tekton/rox_image_scan.yaml" %}
    ```

   !!! note
       Remember to add the remote task in the annotations
       ![rox-image-scan](images/rox-image-scan-annotation.png)

1. Create a pull request with you changes. This should trigger the pipeline in the build namespace.

   ![rox-image-scan](images/rox-image-scan.png)

   ![rox-image-scan-logs](images/rox-image-scan-logs.png)

Great! Let's add more tasks in our pipelineRun in coming tutorials.
