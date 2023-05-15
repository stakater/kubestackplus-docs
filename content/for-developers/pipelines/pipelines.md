# Add Pipeline to Your Application

Now that we have added our first application using Stakater Opinionated GitOps Structure, we can continue by adding pipeline to our application.

SAAP is shipped with all the tools that you need to add a Tekton pipeline to your application. 

### Tekton Pipeline

> Tekton (OpenShift Pipelines) is the new kid on the block in the CI/CD space. It's grown rapidly in popularity as it's Kubernetes Native way of running CI/CD.

Tekton is deployed as an operator in our cluster and allows users to define in YAML Pipeline and Task definitions. <span style="color:blue;">[Tekton Hub](https://hub.tekton.dev/)</span> is a repository for sharing these YAML resources among the community, giving great reusability to standard workflows.
Similar to Tekton Hub, we at stakater have created our own reusable tasks at [Tekton Catalog](https://github.com/stakater/tekton-catalog/)

Tekton is made up of number of YAML files each with a different purpose such as `Task` and `Pipeline`. These are then wrapped together in another YAML file called a `PipelineRun` which represents an instance of a `Pipeline` and a `Workspace` to create an instance of a `Pipeline`.

## Deploying the Tekton Objects

> The Tekton pipeline definitions are not stored with the application codebase because we centralize and share a dynamic Pipeline to avoid duplicated code and effort.

### Tekton Pipeline Chart
We will use stakater's `pipeline-charts` Helm chart to deploy the Tekton resources. The chart contains templates for all required Tekton resources such as `pipeline`, `task`, `eventlistener`, `triggers`, etc.

We will fill in the values for these resources and deploy a functioning pipeline with most of the complexity abstracted away using our Tekton pipeline chart.


The above chart contains all necessary resources needed to build and run a Tekton pipeline. Some of the key things to note above are:
* `eventlistener` -  listens to incoming events like a push to a branch.
* `trigger` - the `eventlistener` specifies a trigger which in turn specifies:
    * `interceptor` - it receives data from the event
    * `triggerbinding` - extracts values from the event interceptor
    * `triggertemplate` - defines `pipeline` run resource template in its definition which in turn references the pipeline

  > **Note**: We do not need to define interceptor and trigger templates in every trigger while using stakater Tekton pipeline chart.

* `pipeline` -  this is the pipeline definition, it wires together all the items above (workspaces, tasks & secrets etc) into a useful & reusable set of activities.
* `tasks` - these are the building blocks of Tekton. They are the custom resources that take parameters and run steps on the shell of a provided image. They can produce results and share workspaces with other tasks.

### SAAP pre-configured cluster tasks:

> SAAP is shipped with many ready-to-use Tekton cluster tasks. Let's take a look at some of the tasks that we will be using to construct a basic pipeline.

1. Navigate to the `OpenShift Console` using `Forecastle`. Select `Pipelines` > `Tasks` in sidebar. Select the `ClusterTasks` tab and search `stakater`. Here you will see all the tasks shipped with SAAP.


### Deploying a working pipeline

> Let's use the `tekton-pipeline-chart` and the above tasks to create a working pipeline. We will be using [this example gitops repository](https://github.com/stakater/nordmart-apps-gitops-config) and [application](https://github.com/stakater-lab/stakater-nordmart-review) in this section.

1. Open up your Gitops repository. We will be using [Stakater opinionated Gitops structure](https://docs.stakater.com/saap/for-delivery-engineers/gitops/structure.html) to deploy our pipelines through it.
> We will be deploying our pipeline resources in 'build' environment. We assume here that the environment has already been created for every tenant.

2. Navigate to Tenant > Application > env (build). In our case 01-gabbar (Tenant) > 02-stakater-nordmart-review-ui > 00-build 

3. Add a Chart.yaml file and a values.yaml file at this location. 
4. Populate the Chart.yaml file with the following content: 
 ````yaml
apiVersion: v2
dependencies:
  - name: stakater-tekton-chart
    repository: https://stakater.github.io/stakater-charts
    version: 3.6.7
description: Helm chart for Tekton Pipelines
name: stakater-main-pr-v1
version: 3.6.7
````
As mentioned earlier, we will use the stakater-tekton-chart to deploy our tekton pipeline resources.

2. Now we will be populating the values file for the Tekton pipeline Chart to create our pipeline.

   ```yaml
   
   pipeline-charts:
      name: stakater-main-pr-v1
      workspaces:
      - name: source
        volumeClaimTemplate:
          accessModes: ReadWriteOnce
          resourcesRequestsStorage: 1Gi
      - name: ssh-directory
        secret:
          secretName: repo-ssh-creds (Give your own unique name)
      - name: repo-token
        secret:
          secretName: stakater-ab-token

      pipelines:
        finally:
          - defaultTaskName: stakater-set-commit-status-0-0-3
            name: stakater-set-commit-status
            params:
            - name: GIT_SECRET_NAME
              value: stakater-ab-token
          - defaultTaskName: stakater-remove-environment-0-0-1
            when:
            - input: $(tasks.stakater-github-update-cd-repo-0-0-2.status)
              operator: notin
              values: ["Succeeded"]
        tasks:
          - defaultTaskName: stakater-set-commit-status-0-0-3
            params:
            - name: STATE
              value: pending
          - name: GIT_SECRET_NAME
            value: stakater-ab-token
          - defaultTaskName: git-clone
            params:
            - name: url
              value: "" (Give repo url)
            workspaces:
            - name: ssh-directory
              workspace: ssh-directory
          - defaultTaskName: stakater-create-git-tag-0-0-3
          - defaultTaskName: stakater-create-environment-0-0-2
            params:
            - name: IMAGE_TAG
              value: $(tasks.stakater-create-git-tag-0-0-3.results.GIT_TAG)
          - defaultTaskName: stakater-code-linting-0-0-1
          - defaultTaskName: stakater-kube-linting-0-0-1
            runAfter:
            - stakater-create-environment-0-0-2
          - defaultTaskName: stakater-sonarqube-scan-0-0-2
            runAfter:
            - stakater-kube-linting-0-0-1
            - stakater-code-linting-0-0-1
          - defaultTaskName: stakater-build-image-flag-0-0-2
          - defaultTaskName: stakater-buildah-0-0-2
            name: build-and-push
            params:
            - name: IMAGE
              value: $(params.image_registry_url):$(tasks.stakater-create-git-tag-0-0-3.results.GIT_TAG)
            - name: CURRENT_GIT_TAG
              value: $(tasks.stakater-create-git-tag-0-0-3.results.CURRENT_GIT_TAG)
            - name: BUILD_IMAGE
              value: $(tasks.stakater-build-image-flag-0-0-2.results.BUILD_IMAGE)
          - defaultTaskName: stakater-trivy-scan-0-0-1
            params:
            - name: IMAGE
              value: $(params.image_registry_url):$(tasks.stakater-create-git-tag-0-0-3.results.GIT_TAG)
            - name: BUILD_IMAGE
              value: $(tasks.stakater-build-image-flag-0-0-2.results.BUILD_IMAGE)
            runAfter:
            - build-and-push
          - defaultTaskName: stakater-checkov-scan-0-0-2
            params:
            - name: BUILD_IMAGE
              value: $(tasks.stakater-build-image-flag-0-0-2.results.BUILD_IMAGE)
            runAfter:
              - build-and-push
          - defaultTaskName: stakater-comment-on-pr-0-0-2
            params:
            - name: image
              value: >-
                  $(params.image_registry_url):$(tasks.stakater-create-git-tag-0-0-3.results.GIT_TAG)
            runAfter:
              - stakater-trivy-scan-0-0-1
              - stakater-checkov-scan-0-0-2
          - defaultTaskName: stakater-helm-push-0-0-2
            params:
            - name: semVer
              value: $(tasks.stakater-create-git-tag-0-0-3.results.GIT_TAG)
          - defaultTaskName: stakater-github-update-cd-repo-0-0-2
            params:
              - name: CD_REPO_URL
                value: 'git@github.com:stakater-ab/stakater-apps-gitops-prod.git'
              - name: IMAGE_TAG
                value: $(tasks.stakater-create-git-tag-0-0-3.results.GIT_TAG)
          - defaultTaskName: stakater-push-main-tag-0-0-2
            params:
              - name: IMAGE_TAG
                value: $(tasks.stakater-create-git-tag-0-0-3.results.GIT_TAG)
              - name: GITHUB_TOKEN_SECRET
                value: "repo-ssh-creds"

      triggertemplate:
        serviceAccountName: stakater-tekton-builder
        pipelineRunNamePrefix: $(tt.params.repoName)-$(tt.params.prnumberBranch)
        pipelineRunPodTemplate:
          tolerations:
            - key: "pipeline"
              operator: "Exists"
              effect: "NoExecute"
      eventlistener:
        serviceAccountName: stakater-tekton-builder
        triggers:
        - name: stakater-pr-cleaner-v2-pullrequest-merge
          create: false
        - name: github-pullrequest-create
          bindings:
          - ref: stakater-pr-v1
          - name: oldcommit
            value: $(body.pull_request.base.sha)
          - name: newcommit
            value: $(body.pull_request.head.sha)
        - name: github-pullrequest-synchronize
          bindings:
          - ref: stakater-pr-v1
          - name: oldcommit
            value: $(body.before)
          - name: newcommit
            value: $(body.after)
        - name: github-push
          bindings:
          - ref: stakater-main-v1
          - name: oldcommit
            value: $(body.before)
          - name: newcommit
            value: $(body.after)
      rbac:
        enabled: false
      serviceAccount:
        name: stakater-tekton-builder
        create: false
   ```
Here, we are using the [default triggers](https://github.com/stakater/stakater-tekton-chart/blob/main/stakater-tekton-chart/default-config/triggers.yaml) and trigger bindings. You will need to [deploy your own trigger bindings](https://github.com/stakater/stakater-tekton-chart/blob/085d1ba52175294a21255a27561ac0ebe8621e85/stakater-tekton-chart/values.yaml#L96) and add them as ref to the triggers.


6. Let's see our pipeline definition in the SAAP console now. Select `<TENANT_NAME>-build` namespace in the console. Now in the `Pipelines` section, click `pipelines`. You should be able to see the pipeline that you just created using the chart.

![pipeline-basic.png](./images/pipeline-basic.png)

With our pipelines definitions synchronized to the cluster, we can now add the webhook to Github `nordmart-review-ui` project.

7. Grab the URL we're going to invoke to trigger the pipeline by checking the event listener route in `<TENANT_NAME>-build` project

   ![add-route.png](./images/add-route.png)

8. Once you have the URL, over on Github go to the application repo > `Settings` > `Webhook` to add the webhook:

    * Add the URL we obtained through the last step in the URL box
    * select `Push Events`, leave the branch empty for now
    * Select `Merge request events`
    * select `SSL Verification`
    * Click `Add webhook` button.

    
With all these components in place - now it's time to trigger pipeline via webhook by checking in some code for Nordmart review ui.

10. Let's make a simple change to `stakater-nordmart-review-ui`. Edit `ReadMe.md` by adding some new lines in the file. Create a Pull request.

11. Navigate to the OpenShift Console ...


🪄 Observe Pipeline running by browsing to `OpenShift UI` > `Pipelines` from left pane > `Pipelines` in your `<TENANT_NAME>-build` project:

![pipeline-running.png](./images/pipeline-running.png)
