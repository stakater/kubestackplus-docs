# Add EndpointMonitor

`EndpointMonitor` resource can be used to manage monitors on static urls or route/ingress references.

## Specifying url

```yaml
apiVersion: endpointmonitor.stakater.com/v1alpha1
kind: EndpointMonitor
metadata:
  name: stakater
spec:
  forceHttps: true
  url: https://stakater.com
```

## Specifying route reference

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

## Specifying ingress reference

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

## Add EndpointMonitor using Application chart

If the application is using Stakater Application Chart, [`endpointMonitor`](https://github.com/stakater/application/blob/master/application/templates/endpointmonitor.yaml) can be enabled using the values file

```yaml
endpointMonitor:
  enabled: true
```

This will configure UptimeRobot to watch the specified URL.

Downtime alerts can be sent to specific slack channels following this guide, [UptimeRobot Downtime Notifications](../../monitoring-stack/downtime-notifications-uptimerobot.md).
