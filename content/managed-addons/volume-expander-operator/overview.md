# Overview

[Volume Expander Operator](https://github.com/redhat-cop/volume-expander-operator) purpose is to expand volumes when they are running out of space. This is achieved by using the volume expansion feature.

The operator periodically checks the kubelet_volume_stats_used_bytes and kubelet_volume_stats_capacity_bytes published by the kubelets to decide when to expand a volume. Notice that these metrics are generated only when a volume is mounted to a pod. Also the kubelet takes a minute or two to start generating accurate values for these metrics. The operator accounts for that.
