# Use a ClusterTask in Pipeline

## PreRequisites

- [ClusterTask is deployed via Infra GitOps Repository](../add-a-cluster-task/add-cluster-task.md).

## Objective

Add a clusterTask to enhance Tekton pipeline.

## Key Results

- Update Tekton chart values in GitOps.
- Pipeline Update and Tasks runs successfully.

## Guide

### Verify that Task Exists

1. Login to the OpenShift console, Select `Pipelines > Tasks` from the left bar and then select `ClusterTasks` tab in right pane.

    ![`clustertasks-in-openshift-console`](../images/clustasks-in-openshift-console.png)

1. Verify that your Task exists on the cluster by searching its name.

### Add clustertask in pipeline in place

> To specify this task as default task, follow the [next section](#add-clustertask-in-pipeline-as-default-task)
1. Open your Apps GitOps Repository and Navigate to the folder of your pipelines either `tenant/app-name/build` or `tenant/tekton-pipelines/build` folder.

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
          ↑↑↑↑↑↑↑↑↑↑↑↑↑↑
          - defaultTaskName: stakater-create-git-tag-0-0-3
    ```
    
    If you want to override a parameter, you could simply define it with its new value as shown above.

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
        ↑↑↑↑↑↑↑↑↑↑↑↑↑
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
            - name: WORKSPACE_NAME_IN_TASK
              value: WORKSPACE_NAME_IN_VALUES # co responds to workspaces[].name
          ↑↑↑↑↑↑↑↑↑↑↑↑↑
          - defaultTaskName: stakater-create-git-tag-0-0-3
    ```
    You can override `params` in ClusterTask simply by specifying it inside the `params` field.

1. Create a pull request and get these changes merged.

### Add clustertask in pipeline as default task

> Don't follow this section if you have completed the above section.

If you want to add this clustertask as `defaultTask` in [stakater-tekton-chart](https://github.com/stakater/stakater-tekton-chart), you will need to fork and version control the chart. Push a new version of chart for every new default task.

#### Fork the Tekton Chart

1. Fork this repository [`stakater-tekton-chart`](https://github.com/stakater/stakater-tekton-chart) in your organization and setup CI for pushing helm chart.

    > This should only be performed once.

#### Add the Task

1. Navigate to `stakater-tekton-chart/default-config/tasks` directory & make a new yaml file named same as clustertask name.
1. Inside the file, Specify name that will be matched with `defaultTaskName` in pipeline.tasks[].defaultTaskName to get  taskRef or taskSpec, params & workspaces.

    ```
    # name field can be different from CLUSTER_TASK_NAME, this field is matched with defaultTaskName in pipeline.tasks[].defaultTaskName to get the params,workspaces, when, taskRef fields.
    name: DEFAULT_CLUSTER_TASK_NAME
    taskRef:
      task: CLUSTER_TASK_NAME
      kind: ClusterTask
      # kind: Task
    params:
    - name: PARAM1
      value: $(params.VALUE1)
    workspaces:
    # workspace with .name should be defined in values file in workspaces[].
    - name: WORKSPACE1_IN_CLUSTERTASK
      workspace: WORKSPACE1_IN_VALUES
    ```

1. Save this file. Merge the changes into main branch and push the corresponding helm chart.

1. Open your Apps GitOps Repository and Navigate to the folder of your pipelines either `tenant/app-name/build` or `tenant/tekton-pipelines/build` folder.

1. Open the Chart.yaml file and update the repository and version in dependencies[].repository and dependencies[].version.

1. Now you can add this task in pipeline under .Values.pipeline.tasks[] in values.yaml as following:

      ```
      pipelines:
        tasks:
        - defaultTaskName: DEFAULT_CLUSTER_TASK_NAME
          # name: PIPELINE_READABLE_CLUSTER_TASK_NAME
      ```
    > Specify name to make step name readable or avoid conflicting task names

    > If your task uses a workspace, make sure you have defined it inside workspaces[] in values.yaml as well.

1. Resulting pipeline manifest

    ```
    # Source: stakater-tekton-chart/templates/pipeline.yaml
    apiVersion: tekton.dev/v1beta1
    kind: Pipeline
    metadata:
      name: pipeline_name
    spec:
      params:
      - name: PARAM1
        type: string
      workspaces:
      - name: WORKSPACE1_IN_VALUES
        ...
      tasks:
      - name: PIPELINE_READABLE_CLUSTER_TASK_NAME
        taskRef:
          name: CLUSTER_TASK_NAME
          kind: ClusterTask
        params:
        - name: PARAM1
          value: $(params.VALUE1)
        workspaces:
        - name: WORKSPACE1_IN_CLUSTERTASK
          workspace: WORKSPACE1_IN_VALUES
    ```

1. Create a pull request and get these changes merged.

### Verify the updated pipeline

1. Log in to ArgoCD and open the application corresponding to this environment. You can find the application name in `tenant/argocd-apps/env/app-name-env.yaml` or `tenant/argocd-apps/env/tekton-pipeline-env.yaml`.

    ```
    Image
    ```

1. Check if your pipeline resource is updated by clicking on the pipeline resource.

    ```
    Image
    ```

1. Trigger the pipeline by making a change in your code repository and see if your task works as expected for pull request opened, updated and merged scenarios.

    ```
    Image
    ```

### Possible Issues
