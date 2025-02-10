# Overview

While the scheduler is used to determine the most suitable node to host a new pod, the descheduler can be used to evict a running pod so that the pod can be rescheduled onto a more suitable node.

SAAP comes pre-configured with a descheduler.

## About the descheduler

You can use the descheduler to evict pods based on specific strategies so that the pods can be rescheduled onto more appropriate nodes.

You can benefit from descheduling running pods in situations such as the following:

- Nodes are underutilized or overutilized.
- Pod and node affinity requirements, such as taints or labels, have changed and the original scheduling decisions are no longer appropriate for certain nodes.
- Node failure requires pods to be moved.
- New nodes are added to clusters.
- Pods have been restarted too many times.

When the descheduler decides to evict pods from a node, it employs the following general mechanism:

- Critical pods with priorityClassName set to system-cluster-critical or system-node-critical are never evicted.
- Static, mirrored, or stand-alone pods that are not part of a replication controller, replica set, deployment, or job are never evicted because these pods will not be recreated.
- Pods associated with daemon sets are never evicted.
- Pods with local storage are never evicted.
- Best effort pods are evicted before burstable and guaranteed pods.
- All types of pods with the descheduler.alpha.kubernetes.io/evict annotation are evicted. This annotation is used to override checks that prevent eviction, and the user can select which pod is evicted. Users should know how and if the pod will be recreated.
- Pods subject to pod disruption budget (PDB) are not evicted if descheduling violates its pod disruption budget (PDB). The pods are evicted by using eviction subresource to handle PDB.

## Descheduler strategies

The following descheduler strategies are available:

### Low node utilization

The LowNodeUtilization strategy finds nodes that are underutilized and evicts pods, if possible, from other nodes in the hope that recreation of evicted pods will be scheduled on these underutilized nodes.

The underutilization of nodes is determined by several configurable threshold parameters: CPU, memory, and number of pods. If a node’s usage is below the configured thresholds for all parameters (CPU, memory, and number of pods), then the node is considered to be underutilized.

You can also set a target threshold for CPU, memory, and number of pods. If a node’s usage is above the configured target thresholds for any of the parameters, then the node’s pods might be considered for eviction.

Additionally, you can use the NumberOfNodes parameter to set the strategy to activate only when the number of underutilized nodes is above the configured value. This can be helpful in large clusters where a few nodes might be underutilized frequently or for a short period of time.

### Duplicate pods

The RemoveDuplicates strategy ensures that there is only one pod associated with a replica set, replication controller, deployment, or job running on same node. If there are more, then those duplicate pods are evicted for better spreading of pods in a cluster.

This situation could occur after a node failure, when a pod is moved to another node, leading to more than one pod associated with a replica set, replication controller, deployment, or job on that node. After the failed node is ready again, this strategy evicts the duplicate pod.

### Violation of inter-pod anti-affinity

The RemovePodsViolatingInterPodAntiAffinity strategy ensures that pods violating inter-pod anti-affinity are removed from nodes.

This situation could occur when anti-affinity rules are created for pods that are already running on the same node.

### Violation of node affinity

The RemovePodsViolatingNodeAffinity strategy ensures that pods violating node affinity are removed from nodes.

This situation could occur if a node no longer satisfies a pod’s affinity rule. If another node is available that satisfies the affinity rule, then the pod is evicted.

### Violation of node taints

The RemovePodsViolatingNodeTaints strategy ensures that pods violating NoSchedule taints on nodes are removed.

This situation could occur if a pod is set to tolerate a taint key=value:NoSchedule and is running on a tainted node. If the node’s taint is updated or removed, the taint is no longer satisfied by the pod’s tolerations and the pod is evicted.

### Too many restarts

The RemovePodsHavingTooManyRestarts strategy ensures that pods that have been restarted too many times are removed from nodes.

This situation could occur if a pod is scheduled on a node that is unable to start it. For example, if the node is having network issues and is unable to mount a networked persistent volume, then the pod should be evicted so that it can be scheduled on another node. Another example is if the pod is crash-looping.

This strategy has two configurable parameters: PodRestartThreshold and IncludingInitContainers. If a pod is restarted more than the configured PodRestartThreshold value, then the pod is evicted. You can use the IncludingInitContainers parameter to specify whether restarts for Init Containers should be calculated into the PodRestartThreshold value.
