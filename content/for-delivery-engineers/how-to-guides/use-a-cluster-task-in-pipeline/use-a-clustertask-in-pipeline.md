# Use a ClusterTask in Pipeline

## Pre Requisites

- [ClusterTask is deployed via Infra GitOps Repository](../add-a-cluster-task/add-cluster-task.md).

## Objective

Add a clusterTask to enhance Tekton pipeline.

## Key Results

- Update Tekton chart values in GitOps

## Guide

1. Login to the OpenShift console, Select `Pipelines > Tasks` from the left bar and then select `ClusterTasks` tab in right pane.

    ```
    Image
    ```

1. Verify that your Task exists on the cluster.

    ```
    Image
    ```


1. Open your Apps Gitops Repository and Navigate to the folder of your pipelines either `tenant/app-name/build` or `tenant/tekton-pipelines/build` folder.

    ```
    Image
    ```

1. Open values.yaml file and add the following yaml in pipeline.tasks:

    ```yaml
          - defaultTaskName: git-clone
            params:
              - name: url
                value: "git@github.com:stakater-ab/mto-console.git"
            workspaces:
              - name: ssh-directory
                workspace: ssh-directory
          ↓↓↓↓↓↓↓↓↓↓↓↓↓
          - name: CLUSTER_TASK_NAME
            taskRef:
              kind: ClusterTask
              name: CLUSTER_TASK_NAME
            params:
            - name: PARAM1
              value: VALUE1
            - name: PARAM2
              value: $(params.PARAM2)
            - name: PARAM3
              value: $(tasks.TASK_NAME.results.RESULT_NAME)
          ↓↓↓↓↓↓↓↓↓↓↓↓↓
          - defaultTaskName: stakater-create-git-tag-0-0-3
    ```

    If the task requires a workspace, Add the workspace in `stakater-tekton-chart.workspaces`. See [values.yaml](https://github.com/stakater/stakater-tekton-chart/blob/main/stakater-tekton-chart/values.yaml) for other configurations.

    ```yaml
      workspaces:
        - name: source
          volumeClaimTemplate:
            accessModes: ReadWriteOnce
            resourcesRequestsStorage: 1Gi
        ↓↓↓↓↓↓↓↓↓↓↓↓↓
        - name: WORKSPACE_NAME
          secret:
            secretName: MY_SECRET_NAME
        ↓↓↓↓↓↓↓↓↓↓↓↓↓
    ```

    Then, Add the workspace in pipeline.tasks:

    ```yaml
          - defaultTaskName: git-clone
            params:
              - name: url
                value: "git@github.com:stakater-ab/mto-console.git"
            workspaces:
              - name: ssh-directory
                workspace: ssh-directory
          ↓↓↓↓↓↓↓↓↓↓↓↓↓
          - name: CLUSTER_TASK_NAME
            taskRef:
              kind: ClusterTask
              name: CLUSTER_TASK_NAME
            params:
            - name: PARAM1
              value: VALUE1
            - name: PARAM2
              value: $(params.PARAM2)
            - name: PARAM3
              value: $(tasks.TASK_NAME.results.RESULT_NAME)
            workspaces:
            - name: WORKSPACE_NAME_IN_VALUES # co responds to workspaces[].name
              value: WORKSPACE_NAME_IN_TASK
          ↓↓↓↓↓↓↓↓↓↓↓↓↓
          - defaultTaskName: stakater-create-git-tag-0-0-3
    ```

1. Create a pull request and get this change merged. Log in to ArgoCD and open the application corresponding to this environment. You can find the application name in `tenant/argocd-apps/env/app-name-env.yaml`.

    ```
    Image
    ```

1. Check if your pipeline resource is updated by clicking on the pipeline resource.

    ```
    Image
    ```

