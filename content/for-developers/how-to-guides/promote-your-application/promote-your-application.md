## Application promotion

To promote application from one environment to another; as mentioned above you will need to bump chart version and image tag version in that environment. You can do so by picking these versions from previous environment.

Objectives:
- Promote your Application to another environment

Key Results:
- Image or Chart version updated


This guide assumes that application is already [on-boarded](application-onboarding.md) to different environments.

### 1. Promote chart

To promote application from one environment to another, you can check the chart version from `Chart.yaml` file from one environment and update version in `Chart.yaml` of next environment:

```yaml
apiVersion: v2
dependencies:
  - name: <application-name>
    repository: <application-chart-repo>
    version: 1.0.51
description: A Helm chart for Kubernetes
name: <application-name>
version: 1.0.51
```

pick version `1.0.51` from above `Chart.yaml` and copy it in `Chart.yaml` of next environment

### 2. Promote image

To promote application from one environment to another, you can check the image tag version from `values.yaml` file from one environment and update version in `values.yaml` of next environment:

`<gitops-repo>/<tenant>/<application>/<env-1>/values.yaml`

```yaml
<application-name>:
  application:
    deployment:
      image:
        repository: <application-docker-repo>
        tag: 1.0.51
```

Pick version `1.0.51` and paste it to next environment

`<gitops-repo>/<tenant>/<application>/<env-2>/values.yaml`

```yaml
<application-name>:
  application:
    deployment:
      image:
        repository: <application-repo>
        tag: 1.0.50
```
