# Creating a Pipeline Using Pipeline as Code

In modern software development practices, pipelines play a crucial role in automating and streamlining the process of building, testing, and deploying applications. This tutorial will guide you through creating a pipeline using pipeline-as-code concepts. We'll focus on GitHub as the provider and assume that you have a SAAP set up with pipeline-as-code capabilities.

To be able to run a pipeline using Tekton pipeline as code. The delivery engineer will need to perform a few steps:

**For the Delivery Engineer:**

1. Configure Security Context
   - Deploy a ClusterRole that grants necessary permissions for the Security Context required by the pipeline's service account.
1. Set Up Pipeline Service Account
   - Utilize the tenant operator to deploy a dedicated pipeline service account within the tenant's designated build namespace. 
1. Create Rolebinding
   - Create a Rolebinding specifically in the build namespace to ensure appropriate access and permissions for the pipeline service account.
1. Manage Application Secrets
   - For each application, securely deploy the required secrets within the respective namespace housing the pipeline-as-code setup.

**For the Developer:**

1. Define Repository Resource
   - Set up the Repository resource within the tenant's designated build namespace. This resource will link to the application's source code repository.
1. Configure Repository Access
   - Securely deploy a secret within the build namespace. This secret will provide the necessary credentials to access the application's Git repository.
1. Create PipelineRun
   - Author a PipelineRun that encapsulates the specific workflow for the application. This defines how the source code will be built, tested, and deployed.
1. Deploy Required Secrets
   - If any additional secrets are required during the pipeline run, ensure they are securely deployed within the appropriate namespace.

By following these steps, the delivery engineer and the developer can collaboratively set up and execute Tekton pipelines as code efficiently and securely.
