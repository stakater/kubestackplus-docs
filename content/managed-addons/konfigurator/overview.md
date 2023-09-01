# Overview

A kubernetes operator that can dynamically generate app configuration when kubernetes resources change

## Features

- Render Configurations to
  - ConfigMap
  - Secret
- Support for GO Templating Engine
- Custom helper functions
- Support to watch the following Kubernetes Resources
  - Pods
  - Services
  - Ingresses

## Configuration

Konfigurator is already configured for Stakater Agility Platform users. More details can be found on [Konfigurator](https://github.com/stakater/Konfigurator).

## Custom Resources

Konfigurator uses two Custom Resources, `PodMetadataInjector` and `KonfiguratorTemplate`. Both are described in the [Custom Resources Section](./explanation/custom-resources.md).
