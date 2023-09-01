# Usage

To add an application to Forecastle you need to add a custom resource for `ForecastleApp`.

To add route from within the cluster:

```yaml
apiVersion: forecastle.stakater.com/v1alpha1
kind: ForecastleApp
metadata:
  name: cr-sample-application
  namespace: default
spec:
  name: Application
  group: "Development Environment"
  icon: https://raw.githubusercontent.com/stakater/ForecastleIcons/master/stakater-big.png
  urlFrom:
    routeRef:
      name: application-route
  networkRestricted: false
```

!!! note
    `routeRef` should point to the name of the route, and the resource `ForecastleApp` should be created in the same namespace as the route.

To add ingress from within the cluster:

```yaml
apiVersion: forecastle.stakater.com/v1alpha1
kind: ForecastleApp
metadata:
  name: cr-sample-application
  namespace: default
spec:
  name: Application
  group: "Development Environment"
  icon: https://raw.githubusercontent.com/stakater/ForecastleIcons/master/stakater-big.png
  urlFrom:
    ingressRef:
      name: application-route
  networkRestricted: false
```

!!! note
    `ingressRef` should point to the name of the ingress, and the resource `ForecastleApp` should be created in the same namespace as the ingress.

To add an external URL:

```yaml
apiVersion: forecastle.stakater.com/v1alpha1
kind: ForecastleApp
metadata:
  name: cr-uptimerobot
  namespace: default
spec:
  name: UptimeRobot
  group: Alerting
  icon: https://uptimerobot.com/assets/img/logo_plain.png
  url: https://uptimerobot.com/
  networkRestricted: false
```
More information about Forecastle usage can be found on [How to Use Forecastle](https://github.com/stakater/Forecastle#configuration)
