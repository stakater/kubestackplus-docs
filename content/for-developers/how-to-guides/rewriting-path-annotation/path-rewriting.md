# Path Rewriting for OpenShift Routes Using Annotations

OpenShift Routes provide a way to expose services externally. Sometimes, it's necessary to rewrite the request path before forwarding it to the backend service. OpenShift allows path rewriting using route annotations.


## Objectives

Understand how to configure path rewriting for OpenShift Routes using annotations.

## Key Results

Successfully implement and verify path rewriting in an OpenShift Route.

## Guide

### Step 1: Create a Route with Path Rewriting Annotations
OpenShift allows path rewriting using the `haproxy.router.openshift.io/rewrite-target` annotation.

#### Example YAML Configuration:
```yaml
apiVersion: route.openshift.io/v1
kind: Route
metadata:
  name: my-app-route
  annotations:
    haproxy.router.openshift.io/rewrite-target: /  # Rewrites path to root
spec:
  host: myapp.example.com
  path: /app
  to:
    kind: Service
    name: my-app-service
  port:
    targetPort: http
  tls:
    termination: edge
```

If you're using [Stakater Leader Chart](https://github.com/stakater/application) same can be achieved by adding following lines to you're application helm chart's `values.yaml`:

```YAML
application:
...
  route:
    enabled: true
    annotations:
      haproxy.router.openshift.io/rewrite-target: /
    host: myapp.example.com
    path: /app
```

### Step 2: Apply the Route Configuration
Save the above YAML file and apply it using inner or outer loop:

### Step 3: Verify the Route
Run the following command to check if the route is created:
```sh
oc get route <route name> -o yaml
```
Try accessing `http://myapp.example.com/app`, and the request should be rewritten to `/` before reaching the backend.

## Conclusion
Path rewriting in OpenShift Routes allows flexible URL handling for backend services. By using the `haproxy.router.openshift.io/rewrite-target` annotation, you can efficiently modify request paths as needed.
