# User Access (SSO)

By default, users logged in (via OAuth external IDPs) do not have any permissions

Two types of permissions can be granted to a user:

- [Customer Admin](#customer-admin)
- [Tenant Level Permissions](#tenant-level-permissions)

## Customer Admin

Customer Admin is an administrator level role for a user (with restrictive access). A user with this role can:

- Create/Manage/Delete Tenants
- Read cluster status (Overview page)
- Administrate non-managed Projects/Namespaces
- Install/Modify/Delete operators in non-managed Projects/Namespaces

To grant this permission to a user please open a [support ticket](https://support.stakater.com/index.html) with Username/Email of the desired user.

## Tenant level Permissions

These permissions are granted per Tenant and are only restricted to the tenant's Namespaces/Projects. For detailed explanation of these roles see [Tenant Member Roles](https://docs.stakater.com/mto/main/tenant-roles.html)

These roles can be granted by [Customer Admin](#customer-admin) by creating/editing the *Tenant* CR.

To grant Tenant level permissions see detailed example for [Tenant CR](https://docs.stakater.com/mto/main/customresources.html#2-tenant)

## Configure Identity Provider For Your Cluster

### Social Identity Providers

A social identity provider can delegate authentication to a trusted, respected social media account. Red Hat Single Sign-On includes support for social networks such as Google, Facebook, Twitter, GitHub, LinkedIn, Microsoft, and Stack Overflow.

### Add Microsoft Identity Provider

This document provides instructions on how to add the Microsoft Identity Provider to your OpenShift cluster.

1. The Stakater Team will provide the Redirect URI to customers who wish to use an identity provider to log in to the OpenShift cluster.

1. To integrate the Redirect URI, follow these steps:

   a. Navigate to the [Microsoft App Registration Portal](https://account.live.com/developers/applications/create).

   b. Click on 'Add URL.' The URL will be shared with you by the Stakater Team.

   c. Record both the 'Application ID' and 'Application Secret' for future reference.

1. Share the recorded 'Application ID' and 'Application Secret' with the Stakater Team. They will use this information to configure the OpenShift cluster.
