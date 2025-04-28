# Types of Environments

There are three type of environments for each tenant:

1. Sandbox Environment
1. CI/CD Environments
1. Other Environments

## 1. Sandbox Environment

A dedicated namespace in cluster for developer in the cluster for every member of the specific tenant, that will also be preloaded with any selected templates and consume the same pool of resources from the tenants quota creating safe remote dev namespaces that teams can use as scratch namespace for rapid prototyping and development. So, every developer gets a Kubernetes-based cloud development environment that feel like working on localhost. These environments are not present in our GitOps structure, they are deployed by `Multi Tenant Operator` if enabled in `Tenant` specification. These environments are also by their nature not monitored, and no alerts are generated for misbehavior or mis-configurations.

## 2. CI/CD Environments

There are three CI/CD environments per tenant

The CI/CD Environments are special Environments that are part of CI/CD workflow. There are 3 kinds of CI/CD environments:

1. Build - Build environment contains all Tekton pipeline configurations/resources like *pipeline,eventlistener,pipelinrun* etc. These pipelines respond to changes in Application/Service source repositories. This environment is used for running pipelines of tenant applications.

1. Preview - Preview environment contains all preview application deployments. As soon as there is a new PR in application, pipeline creates new environment to test this PR. Each PR is deployed in separate namespace.

1. Development - The dynamic test environment is automatically deleted and the Helm manifests are pushed to first permanent application environment i.e. `dev` by the CI pipeline when the pull request is merged.

## 3. Other Environments

There are applications environments like *qa,staging,pre-prod,prod* etc other than CI/CD environment. Application promotion in other environments is done manually by creating a PR to the GitOps repo which includes the:

- bumping of the helm chart version in `Chart.yaml` and
- bumping image tag version in helm values in `values.yaml`
