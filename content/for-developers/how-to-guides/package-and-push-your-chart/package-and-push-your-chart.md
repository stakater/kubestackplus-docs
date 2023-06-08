# Package and push your chart to Nexus

## Objectives

- Push artifacts to Nexus Registry hosted on Stakater App Agility Platform (SAAP).

## Key Results

- Helm chart package and pushed to Nexus.

## Guide

### Package and Upload the chart to Nexus

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

   > Make sure to get credentials from Stakater Admin.

1. Open Nexus UI from Forecastle. Upon opening the link, you'll be redirected to Nexus home page.

   ![`nexus-forecastle`](../images/nexus-forecastle.png)
   ![`nexus-homepage`](../images/nexus-homepage.png)

1. Select `Browse` from the left sidebar, Click on `Helm Charts` to view your Helm Registry Charts.

   ![`nexus-browse-helm`](../images/nexus-browse-helm.png)

1. Verify that the chart you uploaded is present in the list.

    ![`nexus-helm-charts`](../images/nexus-helm-charts.png)