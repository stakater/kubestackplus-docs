# Trivy Scan

## Objectives

- Add `trivy-scan` task to PipelineRun.
- Define parameters, workspaces, and tasks within the PipelineRun for building and deploying your application.

## Key Results

- Successfully create and execute the Tekton PipelineRun using the defined `.tekton/pullrequest.yaml` file, enabling automated CI/CD processes for your application.
- Trivy scan is run on application code.

## Tutorial

### Create PipelineRun with Trivy Scan Task

You have already created a PipelineRun in the previous tutorial. Let's now add another task [`trivy-scan`](https://github.com/stakater-tekton-catalog/trivy-scan) to it.

1. Open up the PipelineRun file you created in the previous tutorial.
1. Now edit the file so the YAML becomes like the one given below.

    ```yaml
      {% include "https://raw.githubusercontent.com/NordMart/review-api/main/.tekton/trivy_scan.yaml" %}
    ```
   !!! note
       Remember to add the remote task in the annotations
       ![Trivy-scan](images/trivy-scan-annotation.png)

1. Create a pull request with you changes. This should trigger the pipeline in the build namespace.

   ![Trivy-scan](images/Trivy-scan.png)

   ![Trivy-scan-logs](images/Trivy-scan-logs.png)

Great! Let's add more tasks in our pipelineRun in coming tutorials.
