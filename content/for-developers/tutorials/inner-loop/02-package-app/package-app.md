# Package the Application

Helm uses a packaging format called charts. A chart is a collection of files that describe a related set of Kubernetes resources. A single chart might be used to deploy something simple, like a `memcached` pod, or something complex, like a full web app stack with HTTP servers, databases, caches, and so on. We need to package the deployments for our application into a Helm Chart.

We need to decide what Kubernetes resources are required for our application. A workload resource (`deployment`, `statefulset`) coupled with service and service account resource can be a good starting point.

## Objectives

- Package your application for deployment on Stakater App Agility Platform (SAAP) into Helm Chart.

## Key Results

- Create helm chart in deploy/ folder.
- Explore generic Application helm chart.

## Tutorial

### Create a Helm Chart with Application Chart

1. Create a directory named deploy/ that will contain the helm chart that will be deployed for our application.

   ```sh
   git clone https://github.com/ORG/repo && cd repo
   mkdir deploy
   ```

1. Create A YAML file containing information about the chart called Chart.yaml.

   ```sh
   touch Chart.yaml
   ```

   ```yaml
   apiVersion: v2
   name: CHART_NAME
   version: 1.0.0
   dependencies: # A list of the chart requirements (optional)
     - name: application
       version: 2.1.13
       repository: https://stakater.github.io/stakater-charts
   appVersion: "0.0.0"
   ```

    This dependency chart allows you to define resources without getting overwhelmed by the complexities of different resource with a simple interface. For a full list of configuration visit the chart repository [here](https://github.com/stakater/application)

1. Next create a values.yaml file for default configuration values for this chart. Lets start by defining values for deployment and service.

   ```sh
   touch values.yaml
   ```

    ```yaml
    application:
      applicationName: APP_NAME
      deployment:
        repository: NEXUS_DOCKER_REG_URL
        tag: 1.0.0
      rbac:
        serviceAccount:
          enabled: true
    ```

1. Run `helm dependency build` to rebuild the charts/ directory based on the `Chart.lock` file.

    ```sh
    helm dependency build
    ```

1. Run `helm template .` to view the resources generated. This chart will generate deployment, service account and service custom resources. This will highlight any other errors in the chart as well.

    ```yaml
    # Source: CHART_NAME/charts/application/templates/serviceaccount.yaml
    apiVersion: v1
    kind: ServiceAccount
    metadata:
      name: APP_NAME
      namespace: default
      labels:
        helm.sh/chart: application-2.1.13
        app.kubernetes.io/managed-by: Helm
        app.kubernetes.io/part-of: APP_NAME
    
      annotations:
    ---
    # Source: CHART_NAME/charts/application/templates/service.yaml
    apiVersion: v1
    kind: Service
    metadata:
      name: APP_NAME
      namespace: default
      labels:
        helm.sh/chart: application-2.1.13
        app.kubernetes.io/managed-by: Helm
        app.kubernetes.io/part-of: APP_NAME
    spec:  
      type: "ClusterIP"
      selector:
        app.kubernetes.io/name: APP_NAME
      ports:
        - name: http
          port: 8080
          protocol: TCP
          targetPort: 8080
    ---
    # Source: CHART_NAME/charts/application/templates/deployment.yaml
    apiVersion: apps/v1
    kind: Deployment
    metadata:
      labels:
        helm.sh/chart: application-2.1.13
        app.kubernetes.io/managed-by: Helm
        app.kubernetes.io/part-of: APP_NAME
      annotations: 
        reloader.stakater.com/auto: "true"
      name: APP_NAME
      namespace: default
    spec:
      selector:
        matchLabels:
          app.kubernetes.io/name: APP_NAME
      strategy:
        type: RollingUpdate
      template:
        metadata:
          labels:
            app.kubernetes.io/name: APP_NAME
        spec:
          containers:
          - name: APP_NAME
            image: repository/image-name
            imagePullPolicy: IfNotPresent
            resources:
              limits:
                memory: 256Mi
                cpu: 0.5
              requests:
                memory: 128Mi
                cpu: 0.1
            securityContext:
              readOnlyRootFilesystem: true
              runAsNonRoot: true
          serviceAccountName: APP_NAME
    ```

    If you want to add resources that cannot be defined with dependency chart. You can simply add them in the `templates/` folder.

> Visit [Stakater Nordmart Review Web](https://github.com/stakater-lab/stakater-nordmart-review-web/tree/main/deploy) and [Stakater Nordmart Review API](https://github.com/stakater-lab/stakater-nordmart-review-api/tree/main/deploy)  to see an example.

### Package Stakater Nordmart Review
