# Update CD Repo

## Objectives

- Add `update-cd-repo` task to PipelineRun.
- Define parameters, workspaces, and tasks within the PipelineRun for building and deploying your application.

## Key Results

- Successfully create and execute the Tekton PipelineRun using the defined `.tekton/pullrequest.yaml` file, enabling automated CI/CD processes for your application.
- The GitOps Repository is updated

## Tutorial

### Create PipelineRun with Checkov Scan Task

You have already created a PipelineRun in the previous tutorial. Let's now add another task `update-cd-repo` to it.

1. Open up the PipelineRun file you created in the previous tutorial.
1. Now edit the file so the YAML becomes like the one given below.

    ```yaml
    apiVersion: tekton.dev/v1beta1
    kind: PipelineRun
    metadata:
      name: pullrequest # pipelineRun name
      annotations:
        pipelinesascode.tekton.dev/on-event: "[pull_request]" # Trigger the pipelineRun on push events on branch main
        pipelinesascode.tekton.dev/on-target-branch: "main"
        pipelinesascode.tekton.dev/task: "[git-clone, https://raw.githubusercontent.com/stakater/tekton-catalog/main/stakater-create-git-tag/rendered/stakater-create-git-tag-0.0.7.yaml, https://raw.githubusercontent.com/stakater/tekton-catalog/main/stakater-create-environment/rendered/stakater-create-environment-0.0.16.yaml,https://raw.githubusercontent.com/stakater/tekton-catalog/main/stakater-code-linting/rendered/stakater-code-linting-0.0.3.yaml,
           https://raw.githubusercontent.com/stakater/tekton-catalog/main/stakater-kube-linting/rendered/stakater-kube-linting-0.0.6.yaml,
           https://raw.githubusercontent.com/stakater/tekton-catalog/main/stakater-unit-test/rendered/stakater-unit-test-0.0.5.yaml,
           https://raw.githubusercontent.com/stakater/tekton-catalog/main/stakater-sonarqube-scan/rendered/stakater-sonarqube-scan-0.0.5.yaml,
           https://raw.githubusercontent.com/stakater/tekton-catalog/main/stakater-buildah/rendered/stakater-buildah-0.0.18.yaml,
           https://raw.githubusercontent.com/stakater/tekton-catalog/main/stakater-trivy-scan/rendered/stakater-trivy-scan-0.0.3.yaml,
           https://raw.githubusercontent.com/stakater/tekton-catalog/main/stakater-rox-image-scan/rendered/stakater-rox-image-scan-0.0.4.yaml,
           https://raw.githubusercontent.com/stakater/tekton-catalog/main/stakater-rox-deployment-check/rendered/stakater-rox-deployment-check-0.0.4.yaml,
           https://raw.githubusercontent.com/stakater/tekton-catalog/main/stakater-rox-image-check/rendered/stakater-rox-image-check-0.0.6.yaml,
           https://raw.githubusercontent.com/stakater/tekton-catalog/main/stakater-checkov-scan/rendered/stakater-checkov-scan-0.0.3.yaml,
           https://raw.githubusercontent.com/stakater/tekton-catalog/main/stakater-helm-push/rendered/stakater-helm-push-0.0.12.yaml, 
           https://raw.githubusercontent.com/stakater/tekton-catalog/main/stakater-github-update-cd-repo/rendered/stakater-github-update-cd-repo-0.0.7.yaml]"
        pipelinesascode.tekton.dev/max-keep-runs: "2" # Only remain 2 latest pipelineRuns on SAAP
    spec:
      params:
        - name: repo_url
          value: "git@github.com:<YOUR-ORG>/<YOUR-REPO-NAME>/" # Place your repo SSH URL
        - name: gitrevision
          value: {{revision}} # Dynamic variable to fetch branch name of the push event on your repo
        - name: repo_path
          value: {{repo_name}} # Dynamic varaible to fetch repo name
        - name: image_registry_url
          value: "<docker-registry-url>" # Place image registry URL without https://
        - name: helm_registry
          value: "<https://helm-registry-url>" # Place helm registry URL with https://
        - name: pull_request_number
          value: {{pull_request_number}}
      pipelineSpec: # Define what parameters will be used for pipeline
        params:
          - name: repo_url
          - name: gitrevision
          - name: repo_path
          - name: image_registry_url
          - name: helm_registry
          - name: pull_request_number
        workspaces: # Mention what workspaces will be used by this pipeline to store data and used by data transferring between tasks
          - name: source
          - name: ssh-directory
        tasks: # Mention what tasks will be used by this pipeline
          - name: fetch-repository #Name what you want to call the task
            taskRef:
              name: git-clone # Name of tasks mentioned in tekton-catalog
              kind: Task
            workspaces: # Mention what workspaces will be used by this task
              - name: output
                workspace: source
              - name: ssh-directory
                workspace: ssh-directory
            params: # Parameters will be used by this task
              - name: depth
                value: "0"
              - name: url
                value: $(params.repo_url)
              - name: revision
                value: $(params.gitrevision)
          - name: create-git-tag
            runAfter:
              - fetch-repository
            taskRef:
              name: stakater-create-git-tag-0.0.7
              kind: Task
            params:
              - name: PR_NUMBER
                value: $(params.pull_request_number)
              - name: GIT_REVISION
                value: $(params.git_revision)
            workspaces:
              - name: source
                workspace: source
              - name: ssh-directory
                workspace: ssh-directory
          - name: stakater-create-environment
            runAfter:
            - create-git-tag
            taskRef:
              kind: Task
              name: stakater-create-environment-0.0.15
            params:
            - name: CREATE_ON_CLUSTER
              value: "true"
            - name: REPO_NAME
              value: $(params.repo_path)
            - name: PR_NUMBER
              value: $(params.pull_request_number)
            - name: GIT_URL
              value: "<https://github.com/org/app.git>" #Replace with your application repository Url
            - name: GIT_BRANCH
              value: $(params.git_branch)
            - name: IMAGE_TAG
              value: $(tasks.create-git-tag.results.GIT_TAG)
            - name: IMAGE_REPO
              value: $(params.image_registry)
            - name: PULL_REQUEST_COMMITS_API # Replace when not using Git
              value: https://api.github.com/repos/$(params.organization)/$(params.repo_path)/pulls/$(params.pull_request_number)/commits
            workspaces:
            - name: output
              workspace: source
            - name: repo-token
              workspace: repo-token
          - name: code-linting
            runAfter:
              - stakater-create-environment
            taskRef:
              name: stakater-code-linting-0.0.3
              kind: Task
            workspaces:
              - name: source
                workspace: source
          - name: kube-linting
            runAfter:
              - stakater-create-environment
            taskRef:
              name: stakater-kube-linting-0.0.6
              kind: Task
            params:
              - name: FILE
                value: manifest.yaml
              - name: DEPLOYMENT_FILES_PATH
                value: deploy
              - name: NAMESPACE
                value: arsenal-build
            workspaces:
              - name: source
                workspace: source
          - name: unit-test
            runAfter:
              - code-linting
              - kube-linting
            taskRef:
              name: stakater-unit-test-0.0.5
              kind: Task
            workspaces:
              - name: source
                workspace: source
          - name: sonarqube-scan
            runAfter:
              - unit-test
            taskRef:
              name: stakater-sonarqube-scan-0.0.5
              kind: Task
            params:
              - name: SONAR_HOST_URL
                value: https://sonarqube-stakater-sonarqube.apps.tno2-ams.s9nghh76.lab.kubeapp.cloud
              - name: SONAR_PROJECT_KEY
                value: $(params.repo_path)
              - name: SONAR_LOGIN
            workspaces:
              - name: source
                workspace: source
          - name: buildah
            runAfter:
              - unit-test
            taskRef:
              name: stakater-buildah-0.0.18
              kind: Task
            params:
              - name: IMAGE
                value: $(params.image_registry):$(tasks.create-git-tag.results.GIT_TAG)
              - name: TLSVERIFY
                value: "false"
              - name: FORMAT
                value: "docker"
              - name: BUILD_IMAGE
                value: "true"
              - name: IMAGE_REGISTRY
                value: $(params.image_registry)
              - name: CURRENT_GIT_TAG
                value: $(tasks.create-git-tag.results.CURRENT_GIT_TAG)
            workspaces:
              - name: source
                workspace: source
          - name: trivy-scan
            runAfter:
              - buildah
              - sonarqube-scan
            taskRef:
              name: stakater-trivy-scan-0.0.3
              kind: Task
            params:
              - name: IMAGE
                value: $(params.image_registry):$(tasks.create-git-tag.results.GIT_TAG)
            workspaces:
              - name: source
                workspace: source
          - name: rox-image-scan
            runAfter:
              - buildah
              - sonarqube-scan
            taskRef:
              name: stakater-rox-image-scan-0.0.4
              kind: Task
            params:
            - name: IMAGE
              value: '$(params.image_registry):$(tasks.create-git-tag.results.GIT_TAG)'
            - name: ROX_API_TOKEN
              value: rox-creds
            - name: ROX_CENTRAL_ENDPOINT
              value: rox-creds
            - name: OUTPUT_FORMAT
              value: csv
            - name: IMAGE_DIGEST
              value: $(tasks.buildah.results.IMAGE_DIGEST)
            - name: BUILD_IMAGE
              value: "true"
          - name: rox-image-check
            runAfter:
              - buildah
              - sonarqube-scan
            taskRef:
              name: stakater-rox-image-check-0.0.7
              kind: Task
            params:
              - name: IMAGE
                value: '$(params.image_registry):$(tasks.create-git-tag.results.GIT_TAG)'
              - name: ROX_API_TOKEN
                value: rox-creds
              - name: ROX_CENTRAL_ENDPOINT
                value: rox-creds
              - name: BUILD_IMAGE
                value: "true"
          - name: rox-deployment-check
            runAfter:
              - buildah
              - sonarqube-scan
            taskRef:
              name: stakater-rox-deployment-check-0.0.4
              kind: Task
            params:
              - name: ROX_API_TOKEN
                value: rox-creds
              - name: ROX_CENTRAL_ENDPOINT
                value: rox-creds
              - name: FILE
                value: manifest.yaml
              - name: DEPLOYMENT_FILES_PATH
                value: deploy
            workspaces:
              - name: source
                workspace: source
          - name: checkov-scan
            runAfter:
              - buildah
              - sonarqube-scan
            taskRef:
              name: stakater-checkov-scan-0.0.3
              kind: Task
            workspaces:
              - name: source
                workspace: source
          - name: helm-push
            runAfter:
              - trivy-scan
              - rox-deployment-check
              - rox-image-scan
              - rox-image-check
              - checkov-scan
            taskRef:
              name: stakater-helm-push-0.0.12
              kind: Task
            params:
              - name: PR_NUMBER
                value: $(params.pull_request_number)
              - name: REPO_PATH
                value: $(params.repo_path)
              - name: GIT_REVISION
                value: $(params.git_revision)
              - name: REGISTRY
                value: $(params.helm_registry)
              - name: SEM_VER
                value: $(tasks.create-git-tag.results.GIT_TAG)
            workspaces:
              - name: source
                workspace: source
          - name: update-cd-repo
            runAfter:
              - helm-push
            taskRef:
              kind: Task
              name: stakater-github-update-cd-repo-0.0.7
            params:
              - name: IMAGE_TAG
                value: $(tasks.create-git-tag.results.GIT_TAG)
              - name: IMAGE_NAME
                value: $(params.image_registry)
              - name: PR_NUMBER
                value: $(params.pull_request_number)
              - name: REPO_PATH
                value: $(params.repo_path)
              - name: GIT_REVISION
                value: $(params.git_revision)
              - name: NAMESPACE
                value: $(params.tenant)-dev
              - name: ENVIRONMENT
                value: dev
              - name: HELM_REGISTRY
                value: $(params.helm_registry)
              - name: CD_REPO_URL
                value: git@github.com:$(params.organization)/nordmart-apps-gitops-config.git
            workspaces:
              - name: source
                workspace: source
              - name: ssh-directory
                workspace: cd-ssh-creds
      workspaces: # Mention Workspaces configuration
        - name: source
          volumeClaimTemplate:
            spec:
              accessModes:
                - ReadWriteOnce
              resources:
                requests:
                  storage: 1Gi
        - name: ssh-directory # Using ssh-directory workspace for our task to have better security
          secret:
            secretName: git-ssh-creds # Created this secret earlier
        - name: repo-token
          secret:
            secretName: git-pat-creds
    ```

   !!! note
   Remember to add the remote task in the annotations

1. Create a pull request with you changes. This should trigger the pipeline in the build namespace.

   ![update-cd-repo](images/update-cd-repo.png)

   ![update-cd-repo](images/update-cd-repo-logs.png)

Great! Let's add more tasks in our pipelineRun in coming tutorials.
