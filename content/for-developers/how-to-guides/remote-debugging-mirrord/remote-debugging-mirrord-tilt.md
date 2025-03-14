# Remote debugging using mirrord and tilt

This guide provides step-by-step instructions for setting up remote debugging for  applications in VSCode using the tilt and mirrord.

## Objectives

- Configure developer's local environment to remotely debug an application running inside a pod on OpenShift.

## Key Results

- Enable developers to remotely debug applications running inside a cluster from their local environment.

## Guide

### Prerequisite

Before setting up the debugging environment, ensure you have an application with Docker and Tilt configuration files. This guide assumes that these are already in place. If you need help setting them up, refer to the [Inner Loop Documentation](https://docs.stakater.com/saap/for-developers/tutorials/inner-loop/prepare-environment/prepare-env.html) for detailed instructions.

You should also have mirrord setup on VSCode. If it's not setup, you can follow [this tutorial](https://docs.stakater.com/saap/managed-addons/mirrord/tutorial/mirrod-setup.html).

### Step 1: Deploy application to cluster

The first step is to deploy your application to sandbox environment. You can simply run a `tilt up` command in the directory containing Tiltfile. This will take few seconds to deploy your application.

### Step 2: Update mirrord configuration

The next step is to update the mirrord configuration file. This file should be located at `<project-path>/.mirrord/mirrord.json`. At the very least, you need to update the name of the pod to which you want your local process to connect. More detailed information about that can be found [here](https://docs.stakater.com/saap/managed-addons/mirrord/tutorial/mirrod-setup.html#step-3-configure-mirrord-and-vscode-debugger).

### Step 3: Start mirrord in VSCode

Now you need to connect your local process to application running in cluster. You can follow [this](https://docs.stakater.com/saap/managed-addons/mirrord/tutorial/mirrod-setup.html#step-5-debugging-with-mirrord) for complete process.
