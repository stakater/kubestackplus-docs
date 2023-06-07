# Routes

Following routes are available:

|   Username   | Privileges                               |                              URL                                                    |
| ------------ | ------------------------------------------- |------------------------------------------------------------------------------------ |
| `helm-user`    | `nx-repository-view-helm-*-*`       |  __`https://nexus-helm-stakater-nexus.{CLUSTER_DOMAIN}/repository/helm-charts/`__  |
| `docker-user`  | `nx-repository-view-docker-*-*` |  __`https://nexus-docker-stakater-nexus.{CLUSTER_DOMAIN}/`__  |
| `mnn-rw-user`  | `nx-repository-view-{maven2,NuGet,NPM}-*-*` |  __`https://nexus-stakater-nexus.{CLUSTER_DOMAIN}/repository/maven-public/`__  |
| `mnn-ro-user`  | `nx-repository-view-{maven2,NuGet,NPM}-*-{browse,read}` |  __`https://nexus-stakater-nexus.{CLUSTER_DOMAIN}/`__  |
