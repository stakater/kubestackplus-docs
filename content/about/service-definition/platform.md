# Platform

## Autoscaling

Node autoscaling is available on few clouds; you can find details in the relevant [cloud section](../cloud-providers/overview.md). You can configure the autoscaler option to automatically scale the number of machines in a cluster.

## Daemonsets

Customers can create and run daemonsets on SAAP. To restrict daemonsets to only run on worker nodes, use the following `nodeSelector`:

```yaml
...
spec:
  nodeSelector:
    role: worker
...
```

## Multiple Availability Zone

In a multiple availability zone cluster, control plane nodes are distributed across availability zones and at least one worker node is required in each availability zone.

## Node Labels

Custom node labels are created by Stakater during node creation and cannot be changed on SAAP at this time. However, custom labels are supported when creating new machine pools.

## OpenShift Version

SAAP is run as a managed service and is kept up to date with the latest OpenShift Container Platform version, see [change management in responsibilities](../responsibilities.md#change-management). Upgrade scheduling to the latest version is available.

## Container Engine

SAAP runs on OpenShift 4 and uses [CRI-O](https://www.redhat.com/en/blog/red-hat-openshift-container-platform-4-now-defaults-cri-o-underlying-container-engine) as the only available container engine.

## Operating System

SAAP runs on OpenShift 4 and uses Red Hat CoreOS as the operating system for all control plane and worker nodes.

## Upgrades

Upgrades can be done either immediately or be scheduled at a specific date by opening a [support ticket](https://support.stakater.com/index.html).

See the [SAAP Update Life Cycle](../update-lifecycle.md) for more information on the upgrade policy and procedures.

## Kubernetes Operator Support

All operators listed in the [Operator Hub marketplace](https://operatorhub.io/) should be available for installation. These operators are considered customer workloads, and are not monitored by Stakater SRE, see [customer applications responsibilities](../responsibilities.md#data-and-applications).

## Red Hat Operator Support

Red Hat workloads typically refer to Red Hat-provided operators made available through [Operator Hub](https://operatorhub.io/). Red Hat workloads are not managed by the Stakater SRE team, and must be deployed on worker nodes and must be managed by the customer, see [customer applications responsibilities](../responsibilities.md#data-and-applications).
