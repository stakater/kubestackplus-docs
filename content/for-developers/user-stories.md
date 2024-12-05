# User Stories

## User Story # 1
As a developer, I want a robust and full-featured remote development environment, so I can iterate quickly and confidently commit functional, tested, and high-quality code

Tags: tilt, local development, inner loop, sandbox namespace

## User Story # 2
As a developer, I want to automatically create preview environments for my pull requests so that I can receive fast feedback before changes are merged into the main branch

Tags: preview environments, feature environments, tronador

## User Story # 3
As a developer, I want to monitor my application’s resource consumption (such as CPU and memory usage) so that I can fine-tune its performance.

Tags: prometheus, openshift console, monitoring

## User Story # 4
As a developer, I want a pipeline-as-code solution that allows the team to define and manage the entire DevOps CI/CD pipeline so that we can store pipeline configurations in source control, version them, and test them independently.

Tags: tekton, argocd, outer loop, CI/CD, pipeline-as-code, pac, devops

## User Story # 5
As a developer, I want environments (such as devtest, stage, and prod) to be stored as code in Git, so the desired state is defined declaratively and Git tooling can be used as the UI.

Tags: argocd, gitops, outer loop

## User Story # 6
As a developer, I want to easily package applications as Helm charts using a leader application chart approach, so I can manage complex dependencies and simplify the deployment, upgrade, and rollback processes for my application.

Tags: helm, outer loop, leader chart, gitops, argocd

## User Story # 7
As a developer, I want to define secrets using Vault and have them securely injected into the cluster, so I can manage sensitive information easily and ensure my application’s security within the SAAP environment.

Tags: secrets management, reloader, vault, openbao, reloader

## User Story # 8
As a developer, I want a semantically versioned Docker image to be automatically built and pushed to an artifact store, so I can ensure consistent and reliable deployment of my application across different environments.

Tags: artifact store, nexus, tagging, docker image, helm chart

## User Story # 9
As a developer, I want a semantically versioned Helm chart to be built and pushed to a Docker registry, so I can manage and deploy my Kubernetes applications with a clear versioning strategy.

Tags: docker registry, helm chart, artifact store, nexus

## User Story # 10
As a developer, I want my application to be automatically released to the first development environment when I merge to the main branch, so I can quickly roll out changes and validate them.

Tags: gitops, argocd, outer loop

## User Story # 11
As a developer, I want to see my application logs in real-time, so I can quickly troubleshoot issues and monitor the application’s performance for better stability and reliability.

Tags: logging, loki, fluentd

## User Story # 12
As a developer, I want a unified dashboard to easily find all applications and tools available on the platform, so I can browse, discover, and navigate to different tools from one place.

Tags: openshift console, dashboard

## User Story # 13
As a developer, I want to inspect code quality and perform a security analysis, so that I can quickly get an overview of the application’s code health.

Tags: sonarqube, outer loop

## User Story # 14
As a developer, I want to view historical (upto 14 days) metrics related to my applications, such as CPU usage, memory consumption, and response times, so that I can analyze their performance over time, identify trends, and optimize resource allocation and application behavior accordingly.

Tags: prometheus, application monitoring

## User Story # 15
As a developer, I want to use the OpenShift Console to easily scale resources up or down, so I can optimize performance and cost based on demand.

Tags: sre, OpenShift Console, scale up, scale down

## User Story # 16
As a developer I want end to end automation and dynamic loading of application configuration so configuration changes are treated as any other deployment.

Tags: reloader

## User Story # 17
As a developer, I want to configure ServiceMonitor objects to collect application-specific metrics, such as response time and the number of reviews, alongside standard metrics, so I can gain deeper insights into my application’s performance and make more informed optimizations.

Tags: application monitoring, service monitor, prometheus

## User Story # 18
As a developer, I want to configure alert conditions and manage notifications, so I can receive timely alerts for critical application events.

Tags: monitoring, alerting, prometheus, alert manager

## User Story # 19
As a developer, I want to receive downtime notification when application isn’t reachable, so I can quickly take action to restore service availability and minimize downtime.

Tags: ingress monitor controller, prometheus, blackbox monitoring

## User Story # 20
As a developer, I want to build and deploy custom Grafana dashboards for my application, so I can visualize custom metrics and gain deeper insights into its performance.

Tags: grafana, application monitoring, prometheus

## User Story # 21
As a developer, I want to enable backups for my applications using Velero, so that in the event of cluster issues or data loss, I can easily restore my apps and minimize downtime.

Tags: backup restore, velero
