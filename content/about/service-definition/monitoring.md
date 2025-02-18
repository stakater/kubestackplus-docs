# Monitoring

This section provides information about the service definition for SAAP monitoring.

## Cluster Metrics

SAAP come with an integrated Prometheus stack for cluster monitoring including CPU, memory, and network-based metrics. This is accessible through the SAAP web console. These metrics also allow for horizontal pod autoscaling based on CPU or memory metrics.

## Application Monitoring

SAAP provides an optional application monitoring stack based on Prometheus to monitor business critical applications. This allows for adding scrape targets in user namespaces.

## Data Retention

By default only seven (7) days data is kept. This can easily be changed. If you want to store data for longer then open a [support ticket](https://support.stakater.com/index.html).
