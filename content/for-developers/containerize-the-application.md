# Containerize the Application

Prerequisites:
- Developed application.
- docker cli.
- Application is part of tenant.

Running workloads in Kubernetes/OpenShift requires the application the be containerized. Typically this includes, taking a relevant base image, installing application dependencies if not available, copying & building the code and command to run your application executed at runtime.

Consider the [stakater-nordmart-review](https://github.com/stakater-lab/stakater-nordmart-review) application we discussed in the previous section.

```sh
git clone https://github.com/stakater-lab/stakater-nordmart-review-ui
cd stakter-nordmart-review-ui
```

Lets create a Dockerfile inside the repository folder and delete any existing file.

  1. Decide a base image for your application. Navigate to [RedHat Container Registry](https://catalog.redhat.com/software/containers/search) and Find a suitable image for your application. Since this application is java application. we use maven base image.

        ```Dockerfile
        FROM maven:3.8.6-openjdk-11-slim AS build
        ```

  2. Use COPY and RUN commands to copy required content to containers filesystem and run commands in containers context.

        ```Dockerfile
        COPY src /usr/src/app/src
        COPY pom.xml /usr/src/app
        RUN mvn -f /usr/src/app/pom.xml clean package
        ```

  3. We will use another FROM statement to create a multi stage build for reducing the overall image size. More info [here](https://docs.docker.com/build/building/multi-stage/). With multi-stage builds, you use multiple FROM statements in your Dockerfile. Each FROM instruction can use a different base, and each of them begins a new stage of the build. You can selectively copy artifacts from one stage to another, leaving behind everything you don’t want in the final image.

        ```Dockerfile
        FROM registry.access.redhat.com/ubi8/openjdk-11:1.14-10
        ```

  4. Add labels to your image, if any.

        ```Dockerfile
        LABEL name="inventory" \
          maintainer="Stakater <hello@stakater. com>" \
          vendor="Stakater" \
          release="1" \
          summary="Java Spring boot application"
        ```

  5. Set an environment variable with ENV command and set it as working directory.

        ```Dockerfile
        ENV HOME=/opt/app
        WORKDIR $HOME
        ```

  6. Use EXPOSE command to expose a container port, typically this corresponds to port on which application runs.

        ```Dockerfile
        EXPOSE 8080
        ```

  7. JAR files were generated as a result of `mvn package`. Copy the artifact generated from build stage.

        ```Dockerfile
        EXPOSE 8080
        ```

  8. Finally, specify the command to be executed when container is created with this image, typically the command to run the application.

        ```Dockerfile
        CMD ["node", "server.js"]
        ```

  9. Run the following command to build the image.

        ```sh
        buildah bud --format=docker --tls-verify=false --no-cache -f ./Dockerfile -t <nexus-docker-reg-url>/<tenant-name>/<app-name>:1.0.0 .

        ```

  10. Run the following command to run the image.

        ```sh
        # -p flag exposes container port 8080 on your local port 8080
        buildah run <nexus-docker-reg-url>/<tenant-name>/<app-name>:1.0.0 .
        ```

  11. Run a curl command to verify that image is running.

        ```sh
        curl localhost:8080/api/review/329199
        ```

Read the following articles for more information:
- [Containerize an application](https://docs.docker.com/get-started/02_our_app/)
- [Tutorial: Containerize a .NET app](https://learn.microsoft.com/en-us/dotnet/core/docker/build-container?tabs=linux)
- [Containerize Your Application With Docker](https://towardsdatascience.com/containerize-your-application-with-docker-b0608557441f)
- [Dockerizing a Node.js web app](https://nodejs.org/en/docs/guides/nodejs-docker-webapp)
- [Dockerizing a Django app](https://blog.logrocket.com/dockerizing-django-app)

### Login to Image Registry

Find the Image registry URL [here](managed-addons/nexus/routes.md) or Navigate to the cluster Forecastle, search `nexus` using the search bar on top menu and copy the nexus url.

- `nexus-docker-reg-url`: Remove `https://` from the start and add `-docker` in URL after `nexus`. This URL points to Docker Registry referred as `nexus-docker-reg-url` in this tutorial for example `nexus-docker-stakater-nexus.apps.clustername.random123string.kubeapp.cloud`.

Run following command to log into the registry. Specify admin provided username and password to login.

```sh
buildah login <nexus-docker-reg-url>
```

## Push Docker Image to Nexus

Replace the placeholders and Run the following command inside application folder.

```sh
# Buldah Bud Info : https://manpages.ubuntu.com/manpages/impish/man1/buildah-bud.1.html
buildah bud --format=docker --tls-verify=false --no-cache -f ./Dockerfile -t <nexus-docker-reg-url>/<tenant-name>/<app-name>:1.0.0 .
```

Lets push the image to nexus docker repo. Make sure to get credentials from Stakater Admin.

```sh
# Buildah push Info https://manpages.ubuntu.com/manpages/impish/man1/buildah-push.1.html
buildah push <nexus-docker-reg-url>/<tenant-name>/stakater-nordmart-review:1.0.0 docker://<nexus-docker-reg-url>/<tenant-name>/stakater-nordmart-review:1.0.0
```

## Verify Image Available

Login to Nexus and Verify that the image is available on the cluster.