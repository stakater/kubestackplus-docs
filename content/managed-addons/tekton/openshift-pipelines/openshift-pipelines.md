# Introduction

OpenShift Pipelines is a cloud-native, continuous integration and delivery (CI/CD) solution for building pipelines using
 Tekton. Tekton is a flexible, Kubernetes-native, open-source CI/CD framework that enables automating deployments across
 multiple platforms (Kubernetes, serverless, VMs, etc) by abstracting away the underlying detail.

![cloud-native-ci](./images/cloud-native-ci.png)

[Tekton](https://github.com/tektoncd/pipeline#-tekton-pipelines) is a standalone project that provides an open, standard and native Kubernetes CI/CD solution.

Main goals:

1. Faster
1. Declarative
1. Reproducible
1. Cloud Native

## OpenShift Pipeline Benefits

1. Kubernetes native pipelines
1. Runs pipelines in containers
1. Runs server-less
1. Build images with Kubernetes tools
1. Deploy to multiple platforms
1. Developer tools
1. Decoupled

## Tekton Concepts

Tekton defines a number of Kubernetes custom resources as building blocks in order to standardize pipeline concepts and
provide a terminology that is consistent across CI/CD solutions:

- Step: Smallest unit of execution that defines Kubernetes container spec
- Task: Run commands within container
- Task Run: Runtime representation of an execution of a task
- Pipeline Resources: Acts as input or output to tasks and pipelines. Example, source code, container image, pull request etc.
- Pipeline: Runs tasks in a defined order based on inputs and outputs
- Pipeline Run: Runtime representation of an execution of a pipeline
- Conditions: Conditional tasks in pipeline

## Pipeline Workflow

![pipeline-workflow](./images/pipeline-workflow.png)

## Continuous Integration/Delivery

For Continuous Integration/Delivery we can use triggers and webhooks:

1. Webhook: Send payload to event-listener whenever a push event or a pull request is created. [More on webhooks](https://docs.github.com/en/developers/webhooks-and-events/webhooks/about-webhooks)
1. Triggers:
    - Event Listeners: Listen to events over a route
    - Trigger Templates: Template generated PipelineResources & PipelineRun based on event
    - Trigger Bindings: Extract info out of payload to be used in trigger templates
    - Interceptors: Filtration of events and payload

### Trigger Workflow

![trigger-workflow](./images/trigger-workflow.png)

## OpenShift Pipelines Catalog - Reusable Tasks

- [Official](https://github.com/tektoncd/catalog)
- [Kabanero-io](https://github.com/kabanero-io/kabanero-pipelines/tree/master/pipelines)
- [OpenShift](https://github.com/openshift/pipelines-catalog)
- [Open-toolchain](https://github.com/open-toolchain/tekton-catalog)
- [RedHat-developer-demos](https://github.com/redhat-developer-demos/pipelines-catalog)

## Useful Resources

- [Tektoncd](https://github.com/tektoncd)
- [OpenShift Pipelines](https://github.com/openshift-pipelines)
- [Pipeline Examples](https://github.com/tektoncd/pipeline/tree/master/examples)
- [Katacoda Course](https://www.katacoda.com/openshift/courses/middleware/pipelines)
- [Visual Studio Code Tekton Pipelines Extension](https://marketplace.visualstudio.com/items?itemName=redhat.vscode-tekton-pipelines)
