# Monitor your Application

In this tutorial, you will learn how to leverage SAAP's built-in monitoring capabilities to observe and enhance the performance of your applications. SAAP uses powerful tools like Prometheus stack integration and Grafana, allowing you to efficiently query and visualize metrics, as well as troubleshooting and monitoring. Whether it's examining basic health indicators or diving into application-specific metrics, SAAP makes application monitoring seamless and effective. Let's dive in and explore how to supercharge your monitoring efforts with SAAP!

## Objectives

- Enable and utilize SAAP's built-in User Workload Monitoring to observe basic health indicators of applications.
- Configure ServiceMonitor objects to gather application-specific metrics, such as response time and number of reviews, alongside the base metrics for better performance analysis.

## Key Results

- Enhance observability by implementing robust monitoring and metrics collection for applications within SAAP.
- Enable developers to analyze and interpret the performance and behavior of their applications through efficient monitoring and metrics visualization.
- Centralize and streamline the monitoring process to facilitate proactive issue identification and troubleshooting.

## Tutorial

### SAAP Monitoring (pods etc.)

1. User Workload Monitoring is enabled by default in SAAP.

    Go to `SAAP` in `Developer` view, go to `Observe`, it should show basic health indicators under `<your-namespace>` Project

    ![product-review-default-metrics](images/product-review-default-metrics.png)

1. You can run queries across the namespace easily with `promql`, a query language for Prometheus. Run a `promql` query to get some info about the memory consumed by the pods in your `<your-namespace>` namespace/project.

    ```bash
    sum(container_memory_working_set_bytes{container!='',namespace='<your-namespace'}) by (pod)
    ```

    ![product-review-promql](images/product-review-promql.png)

### Add Service Monitor

1. Lets check `ServiceMonitor` in `stakater-nordmart-review-api` app.

    SAAP gathers the base metrics to see how our pods are doing. In order to get application specific metrics (like response time or number of reviews or active users etc) alongside the base ones, we need another object: _`ServiceMonitor`_. It will let Prometheus know which endpoint the metrics are exposed so that Prometheus can scrape them. And once the Prometheus has the metrics, we can run query on them (just like we did before!) and create shiny dashboards!

Now, let's add the `ServiceMonitor` for our `stakater-nordmart-review-api` application.

1. Open up `stakater-nordmart-review-api/deploy/values.yaml` file. Add this yaml in your `values.yaml` file.

    ```yaml
        ## Service Monitor
        serviceMonitor:
            enabled: true
    ```

1. To find `serviceMonitor` in SAAP, first login with your credentials, go to `API Explorer`, filter by service, find `ServiceMonitor`:

    ![search service monitor](images/search-service-monitor.png)

    Click on `ServiceMonitor` and go to `instances`:

    ![service monitor instance](images/service-monitor-instance.png)

    And voila, Service Monitor is created!
