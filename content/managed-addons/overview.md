# Addons

Here is the list of fully managed addons available on Stakater App Agility Platform:

| Managed AddOn | Description | License |
| --- | --- | --- |
| CI (continuous integration) | [Tekton](./tekton/overview.md) | OSS |
| CD (continuous delivery) | [ArgoCD](./argocd/overview.md) | OSS |
| Logging | [Loki and Vector](./logging-stack/overview.md) | OSS |
| Monitoring | [Grafana, Prometheus, Thanos and Alertmanager](./monitoring-stack/overview.md) | OSS |
| Distributed Tracing | [Tempo Stack](./tracing/overview.md) | OSS |
| Internal alerting | [Alertmanager](./monitoring-stack/overview.md) | OSS |
| External (downtime) alerting | [Stakater IMC](https://github.com/stakater/IngressMonitorController) | OSS |
| OpenTelemetry | [OpenTelemetry](./opentelemetry/overview.md) | OSS |
| Service mesh | [Istio, Kiali and Jaeger](./service-mesh/overview.md) (only one fully managed control plane) | OSS |
| Image scanning | [Trivy](https://github.com/aquasecurity/trivy) | OSS |
| Backups & Recovery | [Velero](./velero/overview.md) | OSS |
| Authentication and SSO (for managed addons - customer applications requires its own customer managed Keycloak instance) | [Keycloak](https://access.redhat.com/documentation/en-us/red_hat_single_sign-on/7.6), [OAuth Proxy](https://github.com/oauth2-proxy/oauth2-proxy) | OSS |
| Secrets management | [Vault](./vault/overview.md) | OSS |
| Artifacts management (Docker, Helm and Package registry) | [Nexus](./nexus/overview.md) | OSS |
| Code inspection | [SonarQube](./sonarqube/overview.md) | OSS |
| Authorization & Policy Enforcement | [Open Policy Agent, Gatekeeper](./gatekeeper/overview.md) | OSS |
| Log alerting | [Stakater Konfigurator](./konfigurator/overview.md) | OSS |
| Automatic application reload | [Stakater Reloader](./reloader/overview.md) | OSS |
| Developer dashboard - Launchpad to discover applications | [Stakater Forecastle](./forecastle/overview.md) | OSS |
| Multi-tenancy | [Stakater Multi Tenant Operator](./mto/overview.md) | Enterprise licence |
| Feature environments, Preview Environments, Environments-as-a-Service | [Stakater Tronador](https://docs.stakater.com/tronador/#) | Enterprise license |
| Replicate secrets & configmaps | [Stakater Multi Tenant Operator](./mto/overview.md) | Enterprise license |
| GitOps application manager | Stakater Fabrikate | Enterprise license |
| Management and issuance of TLS certificates | [cert-manager](./cert-manager/overview.md) | OSS |
| Automated base image management | [Renovate](./renovate/overview.md) | OSS |
| Advanced cluster security | [RHACS](./rhacs/overview.md) | Enterprise License |
| Automatic volume extension | [Volume Expander Operator](./volume-expander-operator/overview.md) | OSS |
| Vertical pod autoscaling | [Vertical Pod Autoscaling](./vertical-pod-autoscaler/overview.md) | OSS |
| Horizontal pod autoscaling | [Horizontal Pod Autoscaling](./horizontal-pod-autoscaler/overview.md) | OSS |
| DORA metrics | [Pelorus](./pelorus/overview.md) | OSS |
| Declarative resource patching | [Patch Operator](./patch-operator/overview.md) | OSS |
| Ingress controller | [OpenShift Router](./ingress-controller/overview.md) | OSS |
| Kubernetes event routing | [Event Router](./event-router/overview.md) | OSS |
| Lock manager | [RDLM](./rdlm/overview.md) | Enterprise license |
| Local development | [Tilt](./tilt/overview.md) | OSS |
| Showback | [OpenCost](./opencost/overview.md) | OSS |
| Kubernetes dashboard | [Kubernetes Dashboard](./kubernetes-dashboard/overview.md) | OSS |
| Software defined storage | [OpenShift Data Foundation - ODF](./odf/overview.md) | Enterprise license |
| Custom metrics autoscaler | [Custom Metrics Autoscaler](./custom-metrics-autoscaler/overview.md) | OSS |
| Dev Spaces | [Dev Spaces](./devspaces/overview.md) | Enterprise license |
| DNS handling | [External DNS](./external-dns/overview.md) | OSS |
| Leader application chart | [Stakater Application Helm Chart](./helm-leader-chart/overview.md) | OSS |
| Web terminal | [Web Terminal Operator](./web-terminal-operator/overview.md) | OSS |
| Internal development portal/platform | [Backstage](./backstage/overview.md) | OSS |
| Automatic cluster rebalancing | [Descheduler](./descheduler/overview.md) | OSS |
| Automatic compliance scans | [OpenSCAP](./compliance-operator/overview.md) | OSS |
| Infrastructure self-service | [Crossplane](./crossplane/overview.md) | OSS |
| Fetch external secrets | [External Secrets Operator](./external-secrets-operator/overview.md) | OSS |

!!! note
    OSS: Open-Source Software
