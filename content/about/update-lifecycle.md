# SAAP Update Life Cycle

This update life cycle is published for customers and partners to effectively plan, deploy, and support their applications running on SAAP.

SAAP is a managed instance of Red Hat OpenShift and maintains an independent release schedule. The availability of Security Advisories and Bug Fix Advisories for a specific version are dependent upon the Red Hat OpenShift Container Platform life cycle policy and subject to the SAAP maintenance schedule.

## Semantic Versioning

[Semantic versioning](https://semver.org/) and its corresponding terminology is used for SAAP versioning.

## Major Versions

Major versions of SAAP, for example version 1, are supported for one year following the release of a subsequent major version or the retirement of the product. After this time, clusters would need to be upgraded or migrated to the next major version.

## Minor Versions

Stakater supports all minor versions for at least a one year period following general availability of the given minor version.

Customers are notified 30 days prior to the end of the support period. Clusters must be upgraded to a supported minor version prior to the end of the support period, or the cluster will enter a [Limited Support](#limited-support-status) status.

## Patch Versions

For reasons of platform security and stability, patch upgrades are prioritized according to [cluster versioning](./responsibilities.md#change-management).

## Limited Support Status

If a cluster transitions to a Limited Support status, Stakater no longer proactively monitors the cluster, the SLA is no longer applicable, and credits requested against the SLA are denied. It does not mean that you no longer have product support. In some cases, the cluster can return to a fully-supported status if you remediate the violating factors.

SAAP transitions to a Limited Support status for these reasons:

- If you do not agree to upgrade a cluster to a supported version before the end-of-life date
- If you remove or replace any native SAAP components or any other component that is installed and managed by Stakater

If you have questions about a specific action that might cause a cluster to transition to a Limited Support status or need further assistance, open a [support ticket](https://support.stakater.com/index.html).

## Supported Versions Exception Policy

Stakater reserves the right to add or remove new or existing versions, or delay upcoming minor release versions, that have been identified to have one or more critical production impacting bugs or security issues without advance notice.
