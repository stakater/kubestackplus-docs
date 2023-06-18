# Login and browse

## Customer nexus endpoints and their purpose

| URL | Name | Purpose |
|---|---|---|
| `https://nexus-openshift-stakater-nexus.{{ route_subdomain }}` | Nexus base URL for web view. | A dashboard where you can view all the repositories and settings. |
| `https://nexus-docker-openshift-stakater-nexus.{{ route_subdomain }}` | Nexus docker repository endpoint. | It points toward the docker repository in nexus, used to pull and push images. |
| `https://nexus-docker-proxy-openshift-stakater-nexus.{{ route_subdomain }}` | Nexus docker repository proxy. | This is a proxy URL that points towards Docker Hub, used to pull images from Docker Hub. |
| `https://nexus-helm-openshift-stakater-nexus.{{ route_subdomain }}/repository/helm-charts/` | Nexus Helm repository. | This is the nexus Helm repository endpoint, used to pull and push Helm charts. |
| `https://nexus-repository-openshift-stakater-nexus.{{ route_subdomain }}/repository/` | Nexus Maven repository. | This is the nexus Maven repository endpoint, used for Maven apps. |

We also support whitelisting for these endpoints. Please contact support if you want to enable whitelisting for specific IPs.

## Explore Nexus

- You can find the Nexus link on Forecastle
- For the first time it will ask you for `username` and `email`. Please note that you should use the correct email address there, the one registered with Stakater. If you happen to register with wrong `email` address and get locked out. Please contact Stakater support for resolution.
- Automatically you will be granted this role `nexus-oauth-viewer`
- If you would like to have another [role](../explanation/permissions.md); please contact Stakater support
