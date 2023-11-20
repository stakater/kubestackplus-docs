# Create Repository

The `Repository` custom resource helps you connect pipeline-as-code to your SCM. By referencing authentication secrets in the resource, you ensure that your pipeline has the necessary access rights to interact with GitHub.

In this tutorial, you'll create secrets containing your GitHub access credentials and webhook secret. As well as you'll define a Repository CustomResourceDefinition (CRD) to create a PipelineRun using pipeline-as-code.

## Prerequisites

1. You have a pre-configured GitOps repository. If you haven't already configured it, follow [this tutorial](../../../../for-delivery-engineers/tutorials/02-configure-apps-gitops-config/configure-apps-gitops-repo.md)

## Objectives

- Create a Secret to store your GitHub personal token and webhook secret.
- Define a Repository that references the Kubernetes Secret for authentication.
- Establish a secure connection between your code repository and the CI/CD pipeline using a GitHub webhook.

## Key Results

- Defined a Repository in your desired namespace, referencing the `github-webhook-config` Secret.
- Enabled a secure connection between your code repository and your CI/CD pipeline through the GitHub webhook.

## Tutorial

1. To create the `Repository`, navigate to `tenant`>`application`> build path.

1. Create a file named `repository.yaml` and add the following content:

    ```yaml
    apiVersion: "pipelinesascode..dev/v1alpha1"
    kind: Repository
    metadata:
      name: <name-of-repo>
      namespace: <your-namespace>
    spec:
      url: "https://<YOUR_GITHUB_REPO_URL>"
      git_provider:
        secret:
          name: "github-webhook-config"
      webhook_secret:
        name: "github-webhook-config"
    ```

   ![repository](images/repository.png)

Once you add these two files to the repository at the correct path, you can see that ArgoCD has deployed them to the cluster.

![repository](images/repository-synced.png)

That's cool! Let's move on to the next tutorial to create a fully functional pipeline with `pipeline-as-code`.
