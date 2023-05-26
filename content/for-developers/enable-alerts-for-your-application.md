# Enable alerts for your Application

Now that we have enabled metrics for our application the previous section, let's create alerts for it.

Metrics endpoints are scraped via ServiceMonitor by Prometheus.
Prometheus is already installed on your SAAP cluster.

## Metrics endpoints are scraped via ServiceMonitor by Prometheus

To scrape metrics from an endpoint, we use a service monitor. 

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

If you want to generate alert based on some metric, you will need a PrometheusRule Custom Resource for it. A PrometheusRule defines when an alert should fire.

Example PrometheusRule:

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

## Adding Alerts for a Spring Boot Application

Let's take our Spring Boot application again and add alerts for it.

1. Add a Service Monitor in the namespace in which your nordmart application is deployed.
Replace <namespace> in the below manifest to the namespace in which your application is deployed and <app-name> to the name of your application.

```yaml
apiVersion: monitoring.coreos.com/v1
kind: ServiceMonitor
metadata:
  name: review-svc-monitor
  namespace: <namespace>
spec:
  endpoints:
    - interval: 5s
      path: /actuator/prometheus # path where your metrics are exposed
      port: http
  namespaceSelector:
    matchNames:
      - <namespace>
  selector:
    matchLabels:
      app: <app-name>
```

If you have deployed your application using [Stakater's application chart](https://github.com/stakater/application), you need to add the following lines to your helm values file:

```yaml
  serviceMonitor:
    enabled: true
```

By default, we have set the path for the service monitor to `/actuator/prometheus`. In case you want to change the endpoint to monitor, you can use the endpoint key:

```yaml
  serviceMonitor:
    enabled: true
    endpoints:
    - interval: 5s
      path: /actuator/prometheus # path where your metrics are exposed
      port: http
```

2. Now let's add a PrometheusRule for the application. In the previous section we added a custom metric that records the review. We are going to use the custom metric to write a prometheus rule that fires when we get too many low rating.
Replace the <namespace> to the namespace in which your application is deployed.

```yaml
apiVersion: monitoring.coreos.com/v1
kind: PrometheusRule
metadata:
  name: review
  namespace: <namespace>
spec:
  groups:
    - name: nordmart-review-low-rating-warning
      rules: 
        - alert: NordmartReviewLowRatingsCritical # Name of alert
          annotations:
            message: >- # Message that should be added with the alert.
              Total ratings below 2 has crossed the threshold 8. Total reviews:
              {{ $value }}.
          expr: > #condition that fires the alert
            sum by (namespace) (nordmart_review_ratings_total{rating="2"} or
            nordmart_review_ratings_total{rating="1"}) > 8
          labels:
            severity: critical
```

If you have deployed your application using [Stakater's application chart](https://github.com/stakater/application), you need to add the following lines to your helm values file:

```yaml
  prometheusRule:
    enabled: true
    additionalLabels:
      prometheus: stakater-workload-monitoring
    groups:
      - name: nordmart-review-low-rating-warning
        rules:
          - alert: NordmartReviewLowRatingsCritical
            annotations:
              message: >-
                Total ratings below 2 has crossed the threshold 8. Total reviews: {{ $value }}.
            expr: >
              sum by (namespace) (nordmart_review_ratings_total{rating="2"} or nordmart_review_ratings_total{rating="1"}) > 2
            labels:
              severity: critical
```

Now we need to tell Alert Manager where to send the alert. For this we will need to add an AlertManagerConfig. If you need to send alert to a slack channel. You will first need to [add a webhook for that channel in Slack](https://docs.stakater.com/saap/managed-addons/monitoring-stack/log-alerts.html)
Once you have the webhook Url, you can proceed to adding the AlertManagerConfig. The alertmanager uses kubernetes secret to pick up details of the endpoint to send the alerts to. Let's crate the secret first:
Replace <namespace> to the namespace in which your application is deployed and <api_url> to base64 encoded webhook Url

```yaml
kind: Secret
apiVersion: v1
metadata:
  name: review-slack-webhook
  namespace: <namespace>
data:
  api_url: >-
    <api_url>
type: Opaque
```

You can also use application helm chart to deploy the secret.
Let's add the AlertManagerConfig:
Remember to replace <namespace> and <<channel-name>

```yaml
apiVersion: monitoring.coreos.com/v1alpha1
kind: AlertmanagerConfig
metadata:
  name: review
  namespace: <namespace>
spec:
  receivers:
    - name: nordmart-review-receiver
      slackConfigs:
        - apiURL:
            key: api_url
            name: review-slack-webhook #name of the secret that contains details of where to send the alert (Url)"
          channel: '<channel-name>' #Slack channel where alert should be sent
          httpConfig:
            tlsConfig:
              insecureSkipVerify: true
          sendResolved: true
          text: >-
            {{ range .Alerts }}

            *Alert:* `{{ .Labels.severity | toUpper }}` - {{
            .Annotations.summary }}

            *Description:* {{ .Annotations.description }}

            *Details:*
              {{ range .Labels.SortedPairs }} *{{ .Name }}:* `{{ .Value }}`
              {{ end }}
            {{ end }}
          title: >-
            [{{ .Status | toUpper }}{{ if eq .Status "firing" }}:{{
            .Alerts.Firing | len }}{{ end }}] SAAP Alertmanager Event
            Notification
  route:
    groupBy:
      - alertname
      - severity
    groupInterval: 3m
    groupWait: 30s
    matchers:
      - name: alertname
        value: NordmartReviewLowRatingsCritical #Name of the alert that trigger that this config is related to
    receiver: nordmart-review-receiver #create above in the same manifest
    repeatInterval: 1h
```

You can also add this through application helm chart:

```yaml
  alertmanagerConfig:
    enabled: true
    selectionLabels:
      alertmanagerConfig: workload
    spec:
      receivers:
        - name: nordmart-review-receiver
          slackConfigs:
            - apiURL:
                key: api_url
                name: review-slack-webhook
              channel: '#sno8-nordmart-alerts-test'
              sendResolved: true
              text: |2-
                {{ range .Alerts }}
                *Alert:* `{{ .Labels.severity | toUpper }}` - {{ .Annotations.summary }}
                *Description:* {{ .Annotations.description }}
                *Details:*
                  {{ range .Labels.SortedPairs }} *{{ .Name }}:* `{{ .Value }}`
                  {{ end }}
                {{ end }}
              title: '[{{ .Status | toUpper }}{{ if eq .Status "firing" }}:{{ .Alerts.Firing | len }}{{ end }}] SAAP Alertmanager Event Notification'
              httpConfig:
                tlsConfig:
                  insecureSkipVerify: true
      route:
        groupBy:
          - alertname
          - severity
        groupInterval: 3m
        groupWait: 30s
        repeatInterval: 1h
        matchers:
          - name: alertname
            value: NordmartReviewLowRatingsCritical
        receiver: nordmart-review-receiver
  secret:
    enabled: true
    files:
      slack-webhook:
        data:
          api_url: https://hooks.slack.com/services/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
```

Now that we have created everything we need, let's see the alerts firing.

Log in to the SAAP cluster. Change the view to "Developer". You will see the 'Observe' tab in the left Panel.
