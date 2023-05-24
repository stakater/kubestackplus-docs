# Enable alerts for your Application

Now that we have enabled metrics for our application the previous section, let's create alerts for it.

Metrics endpoints are scraped via ServiceMonitor by Prometheus

## Metrics endpoints are scraped via ServiceMonitor by Prometheus

The Prometheus Operator includes a Custom Resource Definition that allows the definition of the ServiceMonitor. The ServiceMonitor is used to define an application you wish to scrape metrics from, the controller will action the ServiceMonitors we define and automatically build the required Prometheus configuration.

Example ServiceMonitor:

```yaml
apiVersion: monitoring.coreos.com/v1
kind: ServiceMonitor
metadata:
  name: example-svc-monitor
  namespace: example-namespace
spec:
  endpoints:
  - interval: 30s
    path: /metrics
    port: metrics
  selector:
    matchLabels:
      app: example-svc-label
```

### Defining PrometheusRule CustomResource

PrometheusRule CustomResource will define rules to generate an alert if the metrics values go below/up a certain value (depends on the use case).

The Template for the File is as follows:

```yaml
apiVersion: monitoring.coreos.com/v1
kind: PrometheusRule
metadata:
  labels:
    prometheus: stakater-workload-monitoring
    role: alert-rules
  name: <NAME_OF_PROMETHEUSRULE>
  namespace: stakater-workload-monitoring
spec:
  groups:
  - name: <GROUP_NAME> 
    rules:
    - alert: <ALERT_NAME>
      annotations:
        message: >-
          <MESSAGE_TO_BE_DISPLAYED>
      expr: | 
          <EXPRESSION_TO_BE_EVALUATED_FOR_ALERT>
      labels:
        severity: <SEVERITY>
        namespace: < NAME_OF_NAMESPACE >
```

Following Example shows Alerts for PersistentVolumes on the metrics scraped from Kubelets

```yaml
apiVersion: monitoring.coreos.com/v1
kind: PrometheusRule
metadata:
 labels:
   prometheus: stakater-workload-monitoring
   role: alert-rules
 name: prometheus-workload-rules
 namespace: stakater-workload-monitoring
spec:
 groups:
   - name: kubernetes-storage
     rules:
       - alert: KubePersistentVolumeUsageCritical
         annotations:
           message: >-
             The PersistentVolume claimed by {{ $labels.persistentvolumeclaim
             }} in Namespace {{ $labels.namespace }} is only {{ $value |
             humanizePercentage }} free.
         expr: >-
           kubelet_volume_stats_available_bytes{namespace!~"(openshift-.*|kube-.*|default|logging)",job="kubelet"}
             /
           kubelet_volume_stats_capacity_bytes{namespace!~"(openshift-.*|kube-.*|default|logging)",job="kubelet"}
             < 0.03
         for: 1m
         labels:
           severity: critical
       - alert: KubePersistentVolumeFullInFourDays
         annotations:
           message: >-
             Based on recent sampling, the PersistentVolume claimed by {{
             $labels.persistentvolumeclaim }} in Namespace {{ $labels.namespace
             }} is expected to fill up within four days. Currently {{ $value |
             humanizePercentage }} is available.
         expr: >-
           (
             kubelet_volume_stats_available_bytes{namespace!~"(openshift-.*|kube-.*|default|logging)",job="kubelet"}
               /
             kubelet_volume_stats_capacity_bytes{namespace!~"(openshift-.*|kube-.*|default|logging)",job="kubelet"}
           ) < 0.15
 
           and
 
           predict_linear(kubelet_volume_stats_available_bytes{namespace!~"(openshift-.*|kube-.*|default|logging)",job="kubelet"}[6h],
           4 * 24 * 3600) < 0
         for: 1h
         labels:
           severity: critical
       - alert: KubePersistentVolumeErrors
         annotations:
           message: >-
             The persistent volume {{ $labels.persistentvolume }} has status {{
             $labels.phase }}.
         expr: >-
          kube_persistentvolume_status_phase{phase=~"Failed|Pending",namespace!~"(openshift-.*|kube-.*|default|logging)",job="kube-state-metrics"}
           > 0
         for: 5m
         labels:
           severity: critical
```
