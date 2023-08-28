# Ingress Monitor Controller

## Problem Statement

There are several uptime monitoring services (statuscake, uptimerobot, pingdom, etc) available which serves the purpose of watching availability of the applications. We would like to take control of automating the configuration process of relevant publically accessible URLs inside the third party monitoring services.

## Solution

Stakater App Agility Platform uses `Ingress Monitor Controller`, an open-source tool to configure different out-of-the-cluster uptime monitor services to check for availability of publically reachable infrastructure and user applications running inside the clusters

## Configuration

IngressMonitorController is already configured for Stakater Agility Platform users. More details can be found on [Ingress Monitor Controller](https://github.com/stakater/IngressMonitorController#-ingress-monitor-controller)

## Usage

### Adding configuration

SAAP uses UptimeRobot free tier as uptime checker, by default.

Uptime checker is configured in the `config.yaml` based on uptime provider.
A secret named
`imc-config` is created that holds `config.yaml` key:

```yaml
kind: Secret
apiVersion: v1
metadata:
  name: imc-config
data:
  config.yaml: >-
    <BASE64_ENCODED_CONFIG.YAML>
type: Opaque
```

### Add EndpointMonitor using CR

`EndpointMonitor` resource can be used to manage monitors on static urls or route/ingress references.

- Specifying url:

```yaml
apiVersion: endpointmonitor.stakater.com/v1alpha1
kind: EndpointMonitor
metadata:
  name: stakater
spec:
  forceHttps: true
  url: https://stakater.com
```

- Specifying route reference:

```yaml
apiVersion: endpointmonitor.stakater.com/v1alpha1
kind: EndpointMonitor
metadata:
  name: frontend
spec:
  forceHttps: true
  urlFrom:
    routeRef:
      name: frontend
```

- Specifying ingress reference:

```yaml
apiVersion: endpointmonitor.stakater.com/v1alpha1
kind: EndpointMonitor
metadata:
  name: frontend
spec:
  forceHttps: true
  urlFrom:
    ingressRef:
      name: frontend
```

 - Add EndpointMonitor using Application chart

Stakater Helm application chart supports [`endpointMonitor`](https://github.com/stakater-charts/application/blob/master/application/values.yaml#L465-L475); You can enable it using the values file

```yaml
endpointMonitor:
  enabled: true
```

This will configure UptimeRobot to watch the specified URL. 

Downtime alerts can be sent to specific slack channels following this guide, [UptimeRobot Downtime Notifications](../monitoring-stack/downtime-notifications-uptimerobot.md).
