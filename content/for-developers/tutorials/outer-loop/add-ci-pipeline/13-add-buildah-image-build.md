# Buildah Image Build

## Objectives

- Add `buildah-image-build` task to PipelineRun.
- Define parameters, workspaces, and tasks within the PipelineRun for building and deploying your application.

## Key Results

- Successfully create and execute the Tekton PipelineRun using the defined `.tekton/pullrequest.yaml` file, enabling automated CI/CD processes for your application.
- Image is built and ready to be push to the repository.

## Tutorial

### Create PipelineRun with Buildah Image Build Task

You have already created a PipelineRun in the previous tutorial. Let's now add another task [`image-build`](https://github.com/stakater-tekton-catalog/buildah-image-build) to it.

1. Open up the PipelineRun file you created in the previous tutorial.
1. Now edit the file so the YAML becomes like the one given below.

    ```yaml
      {% include "https://raw.githubusercontent.com/NordMart/review-api/main/.tekton/buildah_image_build.yaml" %}
    ```

    !!! note
        Remember to add the remote task in the annotations
        ![buildah](images/buildah.png)

1. Create a pull request with you changes. This should trigger the pipeline in the build namespace.

    ![buildah](images/buildah.png)

    ![buildah-logs](images/buildah-logs.png)

Great! Let's add more tasks in our `pipelineRun` in coming tutorials.
