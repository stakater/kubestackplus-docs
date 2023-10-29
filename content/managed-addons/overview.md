# Addons

Here is the list of fully managed addons available on Stakater App Agility Platform:

Managed AddOn | Description
--- | ---
Logging | [ElasticSearch, Fluentd and Kibana](./logging-stack/overview.md)
Monitoring | [Grafana, Prometheus, Thanos and AlertManager](./monitoring-stack/overview.md)
CI (continuous integration) | [Tekton](./tekton/overview.md)
CD (continuous delivery) | [ArgoCD](./argocd/overview.md)
Internal alerting | [Alertmanager](./monitoring-stack/overview.md)
Service mesh | [Istio, Kiali and Jaeger](./service-mesh/overview.md) (only one fully managed control plane)
Image scanning | [Trivy](https://github.com/aquasecurity/trivy)
Backups & Recovery | [Velero](./velero/overview.md)
Authentication an SSO (for managed addons) | [Keycloak](https://access.redhat.com/documentation/en-us/red_hat_single_sign-on/7.6), [OAuth Proxy](https://github.com/oauth2-proxy/oauth2-proxy)
Secrets management | [Vault](./vault/overview.md)
Artifacts management (Docker, Helm and Package registry) | [Nexus](./nexus/overview.md)
Code inspection | [SonarQube](./sonarqube/overview.md)
Authorization & Policy Enforcement | [Open Policy Agent](https://www.openpolicyagent.org/) and [Gatekeeper](https://github.com/open-policy-agent/gatekeeper)
Log alerting | [Stakater Konfigurator](https://github.com/stakater/Konfigurator)
External (downtime) alerting | [Stakater IMC](https://github.com/stakater/IngressMonitorController), [UptimeRobot](https://uptimerobot.com/) (free tier)
Automatic application reload | [Stakater Reloader](https://github.com/stakater/Reloader)
Developer dashboard - Launchpad to discover applications | [Stakater Forecastle](./forecastle/overview.md)
Multi-tenancy | [Stakater Multi Tenant Operator](https://docs.stakater.com/mto/index.html)
Feature environments, Preview Environments, Environments-as-a-Service | [Stakater Tronador](https://docs.stakater.com/tronador/#)
Clone secrets, configmaps, etc. | Stakater Replicator
GitOps application manager | Stakater Fabrikate
Management and issuance of TLS certificates | [cert-manager](./cert-manager/overview.md)
Automated base image management | [Renovate](https://github.com/renovatebot/renovate)
Advanced cluster security | [RHACS](./rhacs/overview.md)
Automatic volume extension | [Volume Expander Operator](./volume-expander-operator/overview.md)
Vertical pod autoscaling | [Vertical Pod Autoscaling](./vertical-pod-autoscaler/overview.md)
Horizontal pod autoscaling | [Horizontal Pod Autoscaling](./horizontal-pod-autoscaler/overview.md)
Dora metrics | [Pelorus](./pelorus/overview.md)
Declartive resource patching | [Patch Operator](./patch-operator/overview.md)
Ingress controller | [OpenShift Router](./ingress-controller/overview.md)
Kubernetes event routing [Event Router](./event-router/overview.md)
Lock manager | [RDLM](./rdlm/overview.md)
Intrusion detection | Falco (coming soon)
