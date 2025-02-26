# Overview

Welcome to the Developer Section, your comprehensive guide to mastering application development and deployment within our ecosystem. This section equips you with the knowledge, tools, and techniques needed to excel in building, deploying, and maintaining your software projects. Whether you're just getting started or seeking to refine your skills, we've organized our content into three main categories to cater to developers at every level:

## User Stories

To gain a deeper understanding of the user journeys with SAAP, refer to the detailed [User Stories](user-stories.md)

## Explanation

- [Developer Training](./explanation/developer-training.md)

    Lay the foundation of your development journey with comprehensive training. Explore fundamental concepts, programming languages, and technologies vital for successful application development.

- [Inner vs Outer Loop](./explanation/inner-outer-loop.md)

    Uncover the inner workings of software development processes. Distinguish between the inner development loop for code iteration and manual deployment and monitoring and the outer development loop for GitOps deployment.

- [Local Development Workflow](./explanation/local-development-workflow.md)

    Dive into creating a seamless local development environment. Included complete local development workflow with diagram.

- [Plan your Deployment](./explanation/plan-your-deployment.md)

    Learn to plan your application deployments effectively. Understand your application and its needs, deployment strategies, version control, and integration points for a smooth transition to production.

- [Production Best Practices](./explanation/production-best-practices.md)

    Elevate your application's performance, security, and scalability. Gain insights into best practices for maintaining production environments, ensuring high availability, and implementing security measures.

## How-To Guides

- [Add Environment to Apps GitOps Repository](./how-to-guides/add-a-new-environment-to-apps-gitops/add-a-new-environment-to-application.md)

    You can extend your application's capabilities by integrating new environments into your GitOps workflow.

- [Build and Push your Image to Nexus](./how-to-guides/build-and-push-your-image/build-and-push-your-image.md)

    Walk through the process of building and pushing container images. Learn how to optimize your image creation process and make them available for deployment.

- [Deploy Application with ArgoCD and Helm](./how-to-guides/deploy-app-with-argocd-and-helm/deploy-app-with-argocd-and-helm.md)

    Follow step-by-step instructions to deploy your application using ArgoCD and Helm charts. Ensure consistent and automated deployments across different environments.

- [Enable metrics for Spring Boot Application](./how-to-guides/expose-spring-boot-metrics/expose-spring-boot-metrics.md)

    Learn how to expose and monitor essential metrics from your Spring Boot application. Configure and visualize metrics to gain insights into your application's health and performance.

- [Package and push your chart to Nexus](./how-to-guides/package-and-push-your-chart/package-and-push-your-chart.md)

    Package your application as a Helm chart and push it to a repository.

- [Application promotion](./how-to-guides/promote-your-application/promote-your-application.md)

    Explore the process of promoting your application across different environments. Facilitate seamless deployments by versioning and sharing your charts with your team.

- [Backup and Restore a Stateful App using Velero](./how-to-guides/velero-stateful-app-example.md)

    Backup and Restore a stateful app with Velero including its namespace and PVCs.

- [Restore PVC data with GitOps](./how-to-guides/velero-restore-with-gitops.md)

    Backup and Restore a GitOps managed stateful app with Velero.

- [Deploy Multiple Applications with Tilt](./how-to-guides/deploy-multiple-apps-with-tilt/deploy-multiple-apps-with-tilt.md)
                                           
    Deploy multiple microservices in a sandbox environment using Tilt.

## Tutorials - Inner Loop

- [Nordmart Review 101](./tutorials/inner-loop/about-application/about-application.md)

    Get acquainted with your application's architecture, components, and dependencies. Lay the groundwork for efficient development and deployment.

- [Access your Cluster](./tutorials/inner-loop/access-the-cluster/access-the-cluster.md)

    You can learn how to access and interact with SAAP.

- [Enable Alerts for your Application](./tutorials/inner-loop/add-alerts/add-alerts.md)

    Implement alerts for your application. Configure notifications and triggers to proactively detect and respond to issues.

- [Configuring your Application with Secrets and Configmaps](./tutorials/inner-loop/add-configmap/add-configmaps.md)

    Master the utilization of Configmaps for externalizing configuration from your application. Centralize your configuration management for increased flexibility.

- [Add Grafana Dashboard to your Application](./tutorials/inner-loop/add-grafana-dashboard/add-grafana-dashboard.md)

    Create and integrate Grafana dashboards to visualize and monitor your application's performance metrics. Design informative and insightful dashboards.

- [Add Network Policy to your Application](./tutorials/inner-loop/add-network-policy/add-network-policy.md)

    Implement network policies to control communication between pods. Enhance security and isolate your application's network traffic within SAAP.

- [Add Pod Disruption Budget (PDB) to your Application](./tutorials/inner-loop/add-pdb/add-pdb.md)

    Ensure high availability by adding Pod Disruption Budgets. Define availability constraints to prevent disruptions during updates or failures.

- [Adding External Secrets for your Application](./tutorials/inner-loop/add-secret/add-secrets.md)

    Securely manage and inject external secrets into your application. Integrate external secret providers to enhance the security and flexibility of your application.

- [Persist your Application](./tutorials/inner-loop/add-storage/persist-app.md)

    Explore different storage options for your application. Configure and manage storage resources to store data and maintain stateful applications.

- [Configure Probes for your Application](./tutorials/inner-loop/configure-probes/configure-probes.md)

    Optimize the reliability of your application by configuring readiness and liveness probes. Set up health checks to ensure proper functioning and automatic recovery.

- [Containerize the Application](./tutorials/inner-loop/containerize-app/containerize-app.md)

    Transform your application into a containerized format. Package your application with its dependencies into container images for consistent deployment.

- [Deploy your Application](./tutorials/inner-loop/deploy-app/deploy-app.md)

    Deploy your application onto SAAP. Utilize Helm charts for smooth deployment.

- [Expose your Application](./tutorials/inner-loop/expose-app/expose-app.md)

    Expose your application to external traffic by setting up services, load balancers, or Ingress controllers. Ensure accessibility for users.

- [Monitor your Application](./tutorials/inner-loop/monitor-your-app/monitor-your-app.md)

    Check out SAAP monitoring solutions to track the health and performance of your application.

- [Package the Application](./tutorials/inner-loop/package-app/package-app.md)

    Package your application as a Helm chart. Create a reusable package for deployment and distribution across different environments.

- [Prepare the Local Environment](./tutorials/inner-loop/prepare-environment/prepare-env.md)

    Set up the environment for your application's deployment. Configure resources, settings, and dependencies to ensure a consistent and reliable environment.

- [Autoscaling your Application](./tutorials/inner-loop/scale-app/scale-app.md)

    Scale your application to handle varying workloads. Configure horizontal scaling to optimize performance and resource utilization.

- [Tilt Zero to Hero](./tutorials/inner-loop/tilt-zero-to-hero/step-by-step-guide.md)

    Master Tilt for efficient local development. Learn how to set up, configure, and utilize Tilt to streamline your development workflow.

- [Enable logging for your Application](./tutorials/inner-loop/validate-logs/validate-logs.md)

    Verify the effectiveness of your application's logging system. Analyze and validate logs to ensure accurate tracking of events and troubleshooting.

- [Validate Auto Reload of your Application](./tutorials/inner-loop/validate-auto-reload/validate-auto-reload.md)

    Explore Stakater's project [Reloader](https://github.com/stakater/Reloader) and integrate it into your application to auto reload your application pods on any particular changes.

## Tutorials - Outer Loop

- [Access your Cluster](./tutorials/outer-loop/access-cluster/access-the-cluster.md)

    Learn how to access, authenticate, and navigate your Kubernetes cluster. Set up your development environment to interact with the cluster seamlessly.

- [Add Environment](./tutorials/outer-loop/add-build-environment/add-environment.md)

    Build a dedicated environment for compiling and building your application. Configure essential tools and resources for efficient and consistent build processes.

- [Add Pipeline to Your Application](./tutorials/outer-loop/add-ci-pipeline/01-overview.md)

    Implement a Continuous Integration (CI) pipeline for your application. Automate testing, building, and deployment processes to ensure code quality and reliability.

- [Promote your Application](./tutorials/outer-loop/promote-application/promote-app.md)

    Master the art of promoting your application across different environments. Set up pipelines and procedures to safely and efficiently move your application from development to production.

We invite you to embark on an enlightening journey through SAAP Developer Section. Whether you're seeking to deepen your understanding of development concepts, looking to optimize your workflows, or aspiring to deploy robust and scalable applications, our diverse range of resources and guides are designed to empower you at every stage of your development process. Happy progressing!
