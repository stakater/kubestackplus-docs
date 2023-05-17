## High Availability


When configuring the ArgoCD Custom Resource within the GitOps Operator Instance Helm chart, you have the option to enable high availability for your ArgoCD instance. High availability in ArgoCD is a feature that provides redundancy and fault tolerance, ensuring continuous operation of the ArgoCD server even in the event of failures or disruptions.

Enabling high availability involves setting up multiple replicas of the ArgoCD server, distributed across different nodes or availability zones in your cluster. This configuration ensures that if one replica becomes unavailable, the other replicas can continue serving requests and managing deployments without interruption.

By leveraging high availability in ArgoCD, you can achieve improved reliability, scalability, and resilience for your continuous deployment workflows. It helps to mitigate the impact of server failures, network issues, or maintenance activities, ensuring uninterrupted access and management of your applications.

With high availability enabled, your ArgoCD instance can handle increased traffic and workload, as requests can be distributed among the available replicas. This helps to optimize performance and responsiveness, even during peak usage periods.

Moreover, high availability in ArgoCD also enhances the recovery process in case of failures. If one replica goes down, the remaining replicas can automatically take over the workload, minimizing the impact on your deployments and ensuring business continuity.

The following section of YAML enables high availability in ArgoCD Custom Resource.

"```"
    ha:
    enabled: false
    resources:
      limits:
        cpu: 500m
        memory: 256Mi
      requests:
        cpu: 250m
        memory: 128M
"```"