# Security

## Authentication Provider

Authentication for the cluster is configured as part of the cluster creation process. SAAP is not an identity provider, and all access to the cluster must be managed by the customer as part of their integrated solution. Creating multiple identity providers at the same time is supported. The following identity providers are supported:

- GitHub or GitHub Enterprise OAuth
- GitLab OAuth
- Google OAuth
- LDAP
- OpenID connect

## Privileged Containers

Privileged containers are not available by default on SAAP. The `anyuid` and `nonroot` Security Context Constraints (SCC) are available for members of the Customer Admin group, and should address many use cases. Privileged containers are only available for Customer Admin users.

## Customer Administrator User

In addition to normal users, Stakater provides access to a SAAP-specific group called `Customer Admin`. The permissions for this role is described on the [roles in SAAP](../../for-cisos/authentication-authorization/saap-authorization-roles.md).

## Cluster Administration Role

As an administrator of SAAP, you have access to the cluster-admin role. While logged in to an account with the cluster-admin role, users have mostly unrestricted access to control and configure the cluster.
