# Deploy Multiple Applications with Tilt

Imagine you’re developing multiple microservices in a sandbox environment. Meta Tilt facilitates local development and validation of these applications before they are promoted to development environments. It also supports hybrid deployments, allowing you to use both local sources and remote Helm charts within sandbox environments.

## Local Source

A local source refers to a microservice that has been cloned locally, where you are making changes for development or modifying the current version.

## Remote Source

A Remote Source refers to a microservice that is already running in a development or production environment. You can deploy it in a sandbox environment as a dependency for your locally cloned microservice.

### Setup meta Tilt file and application

Meta Tiltfile enables the deployment of multiple applications from both local and remote sources.

#### Meta Tilt file

```py
load('ext://helm_resource', 'helm_resource', 'helm_repo')
load('ext://global_vars', 'get_global', 'set_global')

settings = read_json('tilt_options.json', default={})

set_global('meta_tilt', 'True')

if settings.get("namespace"):
    set_global('namespace', settings.get("namespace"))
    namespace = settings.get("namespace")

if settings.get("apps_domain"):
    set_global('apps_domain', settings.get("apps_domain"))
    apps_domain = settings.get("apps_domain")

if settings.get("default_registry"):
    default_registry(settings.get("default_registry").format(namespace), 
                     host_from_cluster='image-registry.openshift-image-registry.svc:5000/{}'.format(namespace))

if settings.get("allow_k8s_contexts"):
    allow_k8s_contexts(settings.get("allow_k8s_contexts"))

# Define the applications and their Tiltfile paths
apps = read_json('apps_list.json', default={})

for app in apps:
    if apps[app]["enabled"]:
        print("Processing %s in %s mode..." % (app, apps[app]["mode"]))
        if apps[app]["mode"] == "local":
            # Check if the local Tiltfile exists
            local_path = apps[app]["local"]
            if os.path.exists(local_path):
                print("Including Tiltfile for %s from %s" % (app, local_path))
                if not os.path.exists("%s/deploy/charts" % (local_path)):
                    local('helm dependency update %s/deploy' % (local_path))
                include("%s/Tiltfile" % (local_path))
            else:
                print("Local repository for %s not found. Skipping..." % (app))
                continue
        elif apps[app]["mode"] == "remote":  # Remote mode
            # Check if the gitops Chart dir exists
            remote_path = apps[app]["remote"]
            if os.path.exists(remote_path):
                print("Deploying Helm Chart for %s from %s" % (app, remote_path))
                if not os.path.exists("%s/charts" % (remote_path)):
                    local('helm dependency update %s' % (remote_path))
                yaml = read_yaml('remote-values.yaml')
                helm_resource(app, remote_path, namespace=namespace, flags=['--set-json=%s=%s' %(app,yaml)])
        else:
            print("Path for %s not found. Skipping..." % (app))
```

#### Example Apps List JSON file

list of the application which can be deployed with meta tile

```json
{
    "<application-name>": {
        "local": "local path for your application tilt file",
        "remote": "local app-gitops for your application chart",
        "mode": "define app mode either remote / local",
        "enabled": true
    },
}
```

#### Example Remote Values file

if there is any override that needs be applied during meta tilt deployment

```yaml
  application:
    deployment:
      replicas: 1
      image:
        repository: review
        tag: 0.0.1
```
