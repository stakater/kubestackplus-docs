# Overview

## Problem Statement

Whenever an application config and/or secret changes, it needs to be ingested into the application containers which is done by restarting the pods.

We would like to watch if some change happens in `ConfigMap` and/or `Secret`; then perform a rolling upgrade on relevant `DeploymentConfig`, `Deployment`, `Daemonset`, `Statefulset` and `Argo Rollout`.

## Solution

Reloader can watch changes in `ConfigMap` and `Secret` and do rolling upgrades on Pods with their associated `DeploymentConfigs`, `Deployments`, `Daemonsets` `Statefulsets` and `Argo Rollouts`.

## Configuration

Reloader is already configured for Stakater Agility Platform users. More details can be found on [Reloader](https://github.com/stakater/Reloader/tree/master#deploying-to-kubernetes).
