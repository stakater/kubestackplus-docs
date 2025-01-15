# Configure Resources with Reloader

Reloader uses a set of annotations to determine which resources need to be watched and correspondingly which resources need to be restarted if a change is detected.

## Auto Detect Resources

Most commonly used annotation is `reloader.stakater.com/auto: "true"`. This will discover all the secrets and configmaps which are used either via environment variable or from volume mount in the deploymentconfigs/deployments/daemonsets/statefulset/rollouts, and it will perform rolling upgrade on related pods when the watched resources are updated.

```yaml
kind: Deployment
metadata:
  annotations:
    reloader.stakater.com/auto: "true"
spec:
  template:
    metadata:
```

## Restrict Auto Discovery

You can restrict this discovery to only `Configmap` or `Secret` objects that
are tagged with a special annotation. To take advantage of that, annotate
your deploymentconfigs/deployments/daemonsets/statefulset/rollouts like this:

```yaml
kind: Deployment
metadata:
  annotations:
    reloader.stakater.com/search: "true"
spec:
  template:
```

and Reloader will trigger the rolling upgrade upon modification of any
`Configmap` or `Secret` annotated like this:

```yaml
kind: Configmap
metadata:
  annotations:
    reloader.stakater.com/match: "true"
data:
  key: value
```

provided the secret/configmap is being used in an environment variable, or a
volume mount.

## Reload on Specific Resources

To perform rolling upgrade when change happens only on specific configmaps or secrets, the annotation `configmap.reloader.stakater.com/reload: "<secret1-name>/<configmap1-name>, <secret2-name>/<configmap2-name>"` can be used, which works on comma-separated names of configmaps or secrets, if multiple.

If a `Deployment` called `foo` has a `Configmap` called `foo-configmap` and a secret called `foo-secret`. Then add this annotation to the metadata of your `Deployment`

```yaml
kind: Deployment
metadata:
  annotations:
    configmap.reloader.stakater.com/reload: "foo-configmap,foo-secret"
spec:
  template:
    metadata:
```

More configurations in which Reloader can be used are mentioned in [How to Use Reloader](https://github.com/stakater/Reloader/tree/master#how-to-use-reloader).
