# Unit Tests

## Objectives

- Add `kube-liting` task to PipelineRun.
- Define parameters, workspaces, and tasks within the PipelineRun for building and deploying your application.

## Key Results

- Successfully create and execute the Tekton PipelineRun using the defined `.tekton/pullrequest.yaml` file, enabling automated CI/CD processes for your application.
- Unit tests performed on the application code.

## Tutorial

### Create PipelineRun with Unit Test Task

You have already created a PipelineRun in the previous tutorial. Let's now add another task [`unit-test`](https://github.com/stakater-tekton-catalog/unit-test) to it.

1. Open up the PipelineRun file you created in the previous tutorial.
1. Now edit the file so the YAML becomes like the one given below.

    ```yaml
      {% include "https://raw.githubusercontent.com/NordMart/review-api/main/.tekton/unit_test.yaml" %}
    ```

    !!! note
        Remember to add the remote task in the annotations
        ![unit-test](images/unit-test-annotation.png)

1. Create a pull request with you changes. This should trigger the pipeline in the build namespace.

    ![unit-test](images/unit-test.png)

    ![unit-test-logs](images/unit-test-logs.png)

Great! Let's add more tasks in our pipelineRun in coming tutorials.
