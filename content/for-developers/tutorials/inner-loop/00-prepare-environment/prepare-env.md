# Prepare local environment

## Objectives

Enable developers to start developing and testing applications on test clusters.

## Key Results

- Install the CLIs required for interacting with cluster

## PreRequisites

- Working laptop or desktop computer with functional Operating System.

## Tutorial

### Setting up CLI

Following CLI tools are required for working with Stakater App Agility Platform.

- [OpenShift CLI (oc)](https://docs.openshift.com/container-platform/4.12/cli_reference/openshift_cli/getting-started-cli.html#installing-openshift-cli) With the OpenShift command-line interface (CLI), the oc command, you can create applications and manage OpenShift Container Platform projects from a terminal.

- [kubectl](https://kubernetes.io/docs/tasks/tools/) The Kubernetes command-line tool, kubectl, allows you to run commands against Kubernetes clusters. You can use kubectl to deploy applications, inspect and manage cluster resources, and view logs.

- [Helm](https://helm.sh/docs/intro/install/) Helm helps you manage Kubernetes applications — Helm Charts help you define, install, and upgrade even the most complex Kubernetes application.

- [Docker](https://docs.docker.com/get-docker/) Docker is an open platform for developing, shipping, and running applications. Docker enables you to separate your applications from your infrastructure so you can deliver software quickly. With Docker, you can manage your infrastructure in the same ways you manage your applications.

- [Buildah](https://github.com/containers/buildah/blob/main/install.md) Buildah is an open source, Linux-based tool that can build Docker- and Kubernetes-compatible images, and is easy to incorporate into scripts and build pipelines. It runs without a container runtime or daemon compared to docker.

- [tilt](https://docs.tilt.dev/install.html) Tilt powers microservice development and makes sure they behave! Run tilt up to work in a complete dev environment configured for your team. Tilt automates all the steps from a code change to a new process: watching files, building container images, and bringing your environment up-to-date. Think docker build && kubectl apply or docker-compose up.
