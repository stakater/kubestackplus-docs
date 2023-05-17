# Platform

## Autoscaling

Node autoscaling is available on few clouds; you can find details in the relevant cloud section. You can configure the autoscaler option to automatically scale the number of machines in a cluster.

## Daemonsets

Customers can create and run daemonsets on SAAP. To restrict daemonsets to only running on worker nodes, use the following nodeSelector:

```
...
spec:
  nodeSelector:
    role: worker
...
```

## Multiple availability zone

In a multiple availability zone cluster, control plane nodes are distributed across availability zones and at least one worker node is required in each availability zone.

## Node labels

Custom node labels are created by Stakater during node creation and cannot be changed on SAAP at this time. However, custom labels are supported when creating new machine pools.

## OpenShift version

SAAP is run as a managed service and is kept up to date with the latest OpenShift Container Platform version. Upgrade scheduling to the latest version is available.

## Container engine

SAAP runs on OpenShift 4 and uses [CRI-O](https://www.redhat.com/en/blog/red-hat-openshift-container-platform-4-now-defaults-cri-o-underlying-container-engine) as the only available container engine.

## Operating system

SAAP runs on OpenShift 4 and uses Red Hat CoreOS as the operating system for all control plane and worker nodes.

## Windows Containers

Red Hat OpenShift support for Windows Containers is not available on SAAP at this time.

## Upgrades

Upgrades can be scheduled by opening a [support case](https://support.stakater.com/index.html).

See the [SAAP Life Cycle](../update-lifecycle.md) for more information on the upgrade policy and procedures.

## Kubernetes Operator support

All Operators listed in the Operator Hub marketplace should be available for installation. These operators are considered customer workloads, and are not monitored by Stakater SRE.

## Red Hat Operator support

Red Hat workloads typically refer to Red Hat-provided Operators made available through Operator Hub. Red Hat workloads are not managed by the Stakater SRE team, and must be deployed on worker nodes and must be managed by the customer.