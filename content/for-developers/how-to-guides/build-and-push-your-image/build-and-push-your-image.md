# Build and Push your Image to Nexus

## Objectives

- Push artifacts to Nexus Registry hosted on Stakater App Agility Platform (SAAP).

## Key Results

- Image built and pushed to image repository

## Guide

### Build the Image

1. Run the following command to build the image.

    ```sh
    buildah bud --format=docker --tls-verify=false --no-cache-f ./Dockerfile -t <nexus-docker-reg-url>/<app-name>:1.0.0 .
    ```

1. Run the following command to run the image.

    ```sh
    # -p flag exposes container port 8080 on your local port8080
    buildah run <nexus-docker-reg-url>/<app-name>:1.0.0 .
    ```

### Login to Image Registry

1. Find the Image registry URL [here](../../../../managed-addons/nexus/routes.md) or Navigate to the cluster Forecastle, search `nexus` using the search bar on top menu and copy the nexus url.

    - `nexus-docker-reg-url`: Remove `https://` from the start and add `-docker` in URL after `nexus`. This URL points to Docker Registry referred as `nexus-docker-reg-url` in this tutorial for example `nexus-docker-stakater-nexus.apps.clustername.random123string.kubeapp.cloud`.

1. Run following command to log into the registry.
    > Make sure to get credentials from Stakater Admin.

    ```sh
    buildah login <nexus-docker-reg-url>
    ```

### Push Docker Image to Nexus

1. Replace the placeholders and Run the following command inside application folder.

    ```sh
    # Buldah Bud Info : https://manpages.ubuntu.com/manpages/impish/man1/buildah-bud.1.html
    buildah bud --format=docker --tls-verify=false --no-cache -f ./Dockerfile -t <nexus-docker-reg-url>/<app-name>:1.0.0 .
    ```

1. Lets push the image to nexus docker repo.

    ```sh
    # Buildah push Info https://manpages.ubuntu.com/manpages/impish/man1/buildah-push.1.html
    buildah push <nexus-docker-reg-url>/<app-name>:1.0.0 docker://<nexus-docker-reg-url>/<tenant-name>/<app-name>:1.0.0
    ```

### Verify Image Available

1. Open Nexus UI from Forecastle. Upon opening the link, you'll be redirected to Nexus home page.

   ![`nexus-forecastle`](../images/nexus-forecastle.png)
   ![`nexus-homepage`](../images/nexus-homepage.png)

1. Select `Browse` from the left sidebar, Click on `docker` to view your Container Image Registry.

   ![`nexus-browse-docker`](../images/nexus-browse-docker.png)

1. Verify that the image you pushed is present in the list.

    ![`nexus-container-image`](../images/nexus-container-image.png)