# Monitoring

This section provides information about the service definition for SAAP monitoring.

## Cluster metrics

SAAP instances come with an integrated Prometheus stack for cluster monitoring including CPU, memory, and network-based metrics. This is accessible through the web console. These metrics also allow for horizontal pod autoscaling based on CPU or memory metrics.

## Application monitoring

SAAP provides an optional application monitoring stack based on Prometheus to monitor business critical applications. This allows for adding scrape targets in user namespaces.

## Data retention

By default only 7 days data is kept; and if you want to store for long term then open a support case.
