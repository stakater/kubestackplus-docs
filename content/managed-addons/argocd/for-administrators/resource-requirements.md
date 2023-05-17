## Resource Requirements

Every time you install the Red Hat OpenShift GitOps Operator, the resources on the namespace are installed within the defined limits. If the default installation does not set any limits or requests, the Operator fails within the namespace with quotas. Without enough resources, the cluster cannot schedule ArgoCD related pods. The following table details the resource requests and limits for the default workloads:

| Workloads | CPU requests | CPU limits | Memory Requests | Memory Limits |
| --- | --- | --- | --- | --- |
| argocd-application-controller | 1 | 2 | 1024M | 2048M |
| applicationset-controller | 1 | 2 | 512M | 1024M |
| argocd-server | 0.125 | 0.5 | 128M | 256M |
| argocd-repo-server | 0.5 | 1 | 256M | 1024M |
| argocd-redis | 0.25 | 0.5 | 128M | 256M |
| argocd-dex | 0.25 | 0.5 | 128M | 256M |
| HAProxy | 0.25 | 0.5 | 128M | 256M |

