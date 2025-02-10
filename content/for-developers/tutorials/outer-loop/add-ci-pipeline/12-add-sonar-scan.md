# SonarQube Scan

## Objectives

- Add `kube-liting` task to PipelineRun.
- Define parameters, workspaces, and tasks within the PipelineRun for building and deploying your application.

## Key Results

- Successfully create and execute the Tekton PipelineRun using the defined `.tekton/pullrequest.yaml` file, enabling automated CI/CD processes for your application.
- Linting is performed on application's Helm Chart.

## Tutorial

### Create PipelineRun with Sonar Scan Task

You have already created a PipelineRun in the previous tutorial. Let's now add another task [`sonar-scan`](https://github.com/stakater-tekton-catalog/sonarqube-scan) to it.

1. Open up the PipelineRun file you created in the previous tutorial.
1. Now edit the file so the YAML becomes like the one given below.

    ```yaml
      {% include "https://raw.githubusercontent.com/NordMart/review-api/main/.tekton/sonarqube_scan.yaml" %}
    ```

    **Notice** we have provided a parameter **`SONAR_HOST_URL`** to the `sonar-scan` task. You need to provide your SonarQube URL here. You can get it from Forecastle.

    !!! note
        Remember to add the remote task in the annotations
        ![`sonar-scan`](images/sonar-scan-annotation.png)

1. Create a pull request with you changes. This should trigger the pipeline in the build namespace.

    ![`sonar-scan`](images/sonar-scan.png)

    ![`sonar-scan-logs`](images/sonar-scan-logs.png)

Great! Let's add more tasks in our `pipelineRun` in coming tutorials.
