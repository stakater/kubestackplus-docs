# Code Linting

## Objectives

- Add `code-linting-mvn` task to PipelineRun.
- Define parameters, workspaces, and tasks within the PipelineRun for building and deploying your application.

## Key Results

- Successfully create and execute the Tekton PipelineRun using the defined `.tekton/pullrequest.yaml` file, enabling automated CI/CD processes for your application.
- Linting is performed on application's code.

## Tutorial

### Create PipelineRun with Code Linting Task

You have already created a PipelineRun in the previous tutorial. Let's now add another task [`code-linting`](https://github.com/stakater-tekton-catalog/code-linting-mvn/tree/0.0.4) to it.

1. Open up the PipelineRun file you created in the previous tutorial.
1. Now edit the file so the YAML becomes like the one given below.

    ```yaml
      {% include "https://raw.githubusercontent.com/NordMart/review-api/main/.tekton/code_linting.yaml" %}
    ```

    !!! note
        Remember to add the remote task in the annotations
        ![code-lint-annotation](images/code-lint-annotation.png)

1. Create a pull request with you changes. This should trigger the pipeline in the build namespace.

    ![code-linting](images/code-linting.png)

    ![code-linting-logs](images/code-linting-logs.png)

Great! Let's add more tasks in our `pipelineRun` in coming tutorials.
