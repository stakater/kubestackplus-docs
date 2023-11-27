# Overview

In modern software development practices, pipelines play a crucial role in automating and streamlining the process of building, testing, and deploying applications. This tutorial will guide you through creating a pipeline using pipeline-as-code concepts. We'll focus on GitHub as the provider and assume that you have a SAAP set up with pipeline-as-code capabilities.

To be able to run a pipeline using Tekton pipeline-as-code. The delivery engineer will need to perform a few steps:

**For the Delivery Engineer:**

1. Bootstrap infra-gitops-config repository
1. Deploy Organization level secret
1. Bootstrap `apps-gitops-config` repository

**For the Developer:**

1. Create Webhook
   - Configure the Webhook for the Pipeline.
1. Create Repository Secret
   - Pipeline as code needs a secret to securely communicate with the Application Repository. This secret is deployed by the developer through the `apps-gitops-config` repository.
1. Define Repository Resource
   - Set up the Repository resource within the tenant's designated build namespace. This resource will link to the application's source code repository.
1. Create PipelineRun
   - Author a PipelineRun that encapsulates the specific workflow for the application. This defines how the source code will be built, tested, and deployed.

By following these steps, the delivery engineer and the developer can collaboratively set up and execute Tekton pipelines as code efficiently and securely.
