# User Stories

## User Story # 1

As a developer, I want a robust and full-featured remote development environment, so I can iterate quickly and confidently commit functional, tested, and high-quality code

![type:video](https://youtu.be/qokw8tuFLt8?si=JvDQlRx_L_VEdaCO)

Tags: tilt, local development, inner loop, sandbox namespace

## User Story # 2

As a developer, I want to automatically create preview environments for my pull requests so that I can receive fast feedback before changes are merged into the main branch

![type:video](https://youtu.be/ZOCZAJItUzY?si=jFicB83qYzTp6YWD)

Tags: preview environments, feature environments, tronador

## User Story # 3

As a developer, I want to monitor my application’s resource consumption (such as CPU and memory usage) so that I can fine-tune its performance.

![type:video](https://youtu.be/HapJ03wCSkE?si=kUUAgS1X_BucND86)

Tags: prometheus, openshift console, monitoring

## User Story # 4

As a developer, I want a pipeline-as-code solution that allows the team to define and manage the entire DevOps CI/CD pipeline so that we can store pipeline configurations in source control, version them, and test them independently.

![type:video](https://youtu.be/PdZbu0eU_SI?si=KiXumdNuVBb0eeRq)

Tags: tekton, argocd, outer loop, CI/CD, pipeline-as-code, pac, devops

## User Story # 5

As a developer, I want environments (such as devtest, stage, and prod) to be stored as code in Git, so the desired state is defined declaratively and Git tooling can be used as the UI.

![type:video](https://youtu.be/0CEO2Dsf-bE?si=A9EpyuSr7rN4CCfL)

Tags: argocd, gitops, outer loop

## User Story # 6

As a developer, I want to easily package applications as Helm charts using a leader application chart approach, so I can manage complex dependencies and simplify the deployment, upgrade, and rollback processes for my application.

![type:video](https://youtu.be/_yK_5c_sB_A?si=6NKVQCP2F-fkuqRN)

Tags: helm, outer loop, leader chart, gitops, argocd

## User Story # 7

As a developer, I want to define secrets using Vault and have them securely injected into the cluster, so I can manage sensitive information easily and ensure my application’s security within the SAAP environment.

![type:video](https://youtu.be/I17DU8sHQN8?si=c-XbRaOgqDNyu1UK)

Tags: secrets management, reloader, vault, openbao, reloader

## User Story # 8

As a developer, I want a semantically versioned Docker image to be automatically built and pushed to an artifact store, so I can ensure consistent and reliable deployment of my application across different environments.

![type:video](https://youtu.be/WAHbeuuAxSI?si=pw9jwGOHeMbllwk8)

Tags: artifact store, nexus, tagging, docker image, helm chart

## User Story # 9

As a developer, I want a semantically versioned Helm chart to be built and pushed to a Docker registry, so I can manage and deploy my Kubernetes applications with a clear versioning strategy.

![type:video](https://youtu.be/Nd7WP0f0Ktk?si=89EPHTazHTVRV1KZ)

Tags: docker registry, helm chart, artifact store, nexus

## User Story # 10

As a developer, I want my application to be automatically released to the first development environment when I merge to the main branch, so I can quickly roll out changes and validate them.

![type:video](https://youtu.be/VFvKg_owX2U?si=AAzAlbNQq6n3zuS-)

Tags: gitops, argocd, outer loop

## User Story # 11

As a developer, I want to see my application logs in real-time, so I can quickly troubleshoot issues and monitor the application’s performance for better stability and reliability.

![type:video](https://youtu.be/zqAFPuu1ABQ?si=yDNL5XOpHE8C2WFG)

Tags: logging, loki, fluentd

## User Story # 12

As a developer, I want a unified dashboard to easily find all applications and tools available on the platform, so I can browse, discover, and navigate to different tools from one place.

![type:video](https://youtu.be/IEHVfPRXKyg?si=1Fl9ypsRMU8g_1-n)

Tags: openshift console, dashboard, forecastle

## User Story # 13

As a developer, I want to inspect code quality and perform a security analysis, so that I can quickly get an overview of the application’s code health.

![type:video](https://youtu.be/fhGHZDctlgU?si=bN_-azl2yq1dSFOI)

Tags: sonarqube, outer loop

## User Story # 14

As a developer, I want to view historical (upto 14 days) metrics related to my applications, such as CPU usage, memory consumption, and response times, so that I can analyze their performance over time, identify trends, and optimize resource allocation and application behavior accordingly.

![type:video](https://youtu.be/b03ej639NSg?si=04rmiMpvsOnEAJhH)

Tags: prometheus, application monitoring

## User Story # 15

As a developer, I want to use the OpenShift Console to easily scale resources up or down, so I can optimize performance and cost based on demand.

![type:video](https://youtu.be/aoCD2zI_Cww?si=BoYN2uU7USEyarf0)

Tags: sre, OpenShift Console, scale up, scale down

## User Story # 16

As a developer I want end to end automation and dynamic loading of application configuration so configuration changes are treated as any other deployment.

![type:video](https://youtu.be/HIhlOWgX4-8?si=4ibW9laCaDxQlqv1)

Tags: reloader

## User Story # 17

As a developer, I want to configure ServiceMonitor objects to collect application-specific metrics, such as response time and the number of reviews, alongside standard metrics, so I can gain deeper insights into my application’s performance and make more informed optimizations.

![type:video](https://youtu.be/FobNiJxLzc0?si=BbjzVeypPFowMyJO)

Tags: application monitoring, service monitor, prometheus

## User Story # 18

As a developer, I want to configure alert conditions and manage notifications, so I can receive timely alerts for critical application events.

![type:video](https://youtu.be/MwHhRHmkNjA?si=katztJaD2JeIWyxF)

Tags: monitoring, alerting, prometheus, alert manager

## User Story # 19

As a developer, I want to receive downtime notification when application isn’t reachable, so I can quickly take action to restore service availability and minimize downtime.

![type:video](https://youtu.be/3ZBeGaawxuI?si=0OZXaHH_dMf0cvJ0)

Tags: ingress monitor controller, prometheus, blackbox monitoring

## User Story # 20

As a developer, I want to build and deploy custom Grafana dashboards for my application, so I can visualize custom metrics and gain deeper insights into its performance.

![type:video](https://youtu.be/dE2sQ75Q8oI?si=OAuU4VwDk-IN7X2B)

Tags: grafana, application monitoring, prometheus

## User Story # 21

As a developer, I want to enable backups for my applications using Velero, so that in the event of cluster issues or data loss, I can easily restore my apps and minimize downtime.

![type:video](https://youtu.be/dyPm4-49DOk?si=b7rSDCtVxwu-IMXe)

Tags: backup restore, velero
