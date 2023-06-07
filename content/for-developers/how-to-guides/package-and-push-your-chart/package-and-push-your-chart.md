# Package and push your chart to Nexus

## Objectives

- Push artifacts to Nexus Registry hosted on Stakater App Agility Platform (SAAP).

## Key Results

- Dockerfile created.
- Image built and pushed to image repository


1. Run the following command to package the helm chart into compressed file.

   ```sh
   # helm package [CHART_PATH]
   helm package .
   ```

   This command packages a chart into a versioned chart archive file.

1. Upload packaged chart to Nexus Helm Registry.

   ```sh
   curl -u "<helm_user>":"<helm_password>" NEXUS_HELM_REG_URL --upload-file "CHART_NAME-CHART_VERSION.tgz"
   ```

