# Comment on PR

## Objectives

- Add `comment-on-pr` task to PipelineRun.
- Define parameters, workspaces, and tasks within the PipelineRun for building and deploying your application.

## Key Results

- Successfully create and execute the Tekton PipelineRun using the defined `.tekton/pullrequest.yaml` file, enabling automated CI/CD processes for your application.
- Dynamic environment application image name and route will be added in the PR comments.

## Tutorial

### Create PipelineRun with Validate Environment Task

You have already created a PipelineRun in the previous tutorial. Let's now add another task [`comment-on-pr`](https://github.com/stakater-tekton-catalog/validate-environment) to it.

1. Open up the PipelineRun file you created in the previous tutorial.
1. Now edit the file so the YAML becomes like the one given below.

    ```yaml
    {% include "https://raw.githubusercontent.com/NordMart/review-api/main/.tekton/comment_on_pr.yaml" %}
    ```

    !!! note
        Remember to add the remote task in the annotations

1. Create a pull request with you changes. This should trigger the pipeline in the build namespace.

    ![validate-environment](images/validate-environment.png)

    ![validate-environment](images/validate-env-logs.png)

Great! Let's add more tasks in our pipelineRun in coming tutorials.
