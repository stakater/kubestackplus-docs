# FAQs

## Why do we reserve memory/CPU on each node?

An OpenShift/Kubernetes Node consist system services that ensure the smooth running of cluster e.g. Kubelet, KubeAPIServer and other OS processes/services. These services can be starved by the workloads running on these nodes and can be starved of CPU time or can cause unexpected Out of Memory (OOM) Exceptions. In order to prevent these issues, a small chunk of resources needs to be permanently allocated to these services so they can run smoothly.
In order to fully utilize resources. An automatic script calculates and allocates cpu/memory resources according to the node utilization. For more details see [capcity reservation docs](https://docs.openshift.com/container-platform/latest/nodes/nodes/nodes-nodes-resources-configuring.html#nodes-nodes-resources-configuring-auto_nodes-nodes-resources-configuring) for openshift.
