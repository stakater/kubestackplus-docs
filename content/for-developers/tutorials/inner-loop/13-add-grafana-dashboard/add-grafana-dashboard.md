# Add Grafana Dashboard to your Application

Welcome to the world of data visualization and real-time monitoring with Grafana on SAAP! If you want to enhance your application's capabilities, you're in the right place. In this tutorial, we'll explore how to add a customized Grafana dashboard to your application in SAAP, allowing you to display live data for various operational use cases, efficiency analysis and A/B test results.

The good news is that Grafana is already a part of the SAAP (Stackater's App Agility Platform) monitoring stack, so you don't need to install it separately. Everything is set up for you!

To get started, head to the `stakater-nordmart-review-api/deploy/templates/grafana-dashboard.yaml` folder, where you'll find the pre-configured dashboard ready to be utilized.

## Objectives

- Explore and view the predefined dashboards for stakater-nordmart-review-api.
- Extend the Nordmart Review Dashboard with a new panel to visualize metrics.
- Learn how to configure dashboards using the Grafana UI.

## Key Results

- Successfully log in to Grafana and view the predefined dashboards for stakater-nordmart-review API.
- Execute API requests to generate data, observing real-time updates in Grafana dashboards.

## Tutorial

### Explore Predefined Dashboards

1. Open up `stakater-nordmart-review-api/deploy/values.yaml` file. Add this yaml in your `values.yaml` file.

    ```yaml
        # Grafana Dashboard
        grafanaDashboard:
            enabled: true
    ```

1. Go to your `Forecastle` and Let's login to Grafana and view the predefined dashboards for `stakater-nordmart-review` API;

    ![Forecastle-workload-Grafana](images/forecastle-workload-grafana.png)

    If you use `Log in with OpenShift` to login and display dashboards - you user will only have `view` role which is read-only. This is alright in most cases, but we want to be able to edit and admin the boards.

  > In order to complete the next steps you will need the OpenShift CLI installed locally, credentials can be retrieved from the OpenShift UI

1. The Dashboards should be showing some basic information and we can generate more data by firing some requests to the `stakater-nordmart-review-api`. In your IDE, run on your terminal:

    ```bash
    # Get the reviews for a specific Product (i.e. 329199)
    curl -L $(oc get route/review -n <your-namespace> --template='{{.spec.host}}')/api/review/329199
    # Add a review for a specific Product (i.e. 329199)
    curl -L -X POST $(oc get route/review -n <your-namespace> --template='{{.spec.host}}')/api/review/329199/John/5/Great
    # Delete a review for a specific review (First get the review id from Get request)
    curl -L -X DELETE $(oc get route/review -n <your-namespace> --template='{{.spec.host}}')/api/review/6323904100aeb66032db19dc
    ```

1. Back in Grafana, we should see some data populated into the boards... Go to the `Manage` and then click on your `<your-namespace>`.

    ![Grafana-http-reqs](./images/product-review-grafana-dashboard-manage.png)
    ![Grafana-http-reqs](./images/product-review-grafana-dashboard-tanent.png)
    ![Grafana-http-reqs](./images/product-review-grafana-dashboard.png)

### Create a Dashboard

> Let's extend the Nordmart Review Dashboard with a new `panel` to capture some metrics in a visual way for us. Configuring dashboards is easy through the Grafana UI. Then Dashboards are easily shared as they can be exported as a `JSON` document.

1. Login back on Grafana

1. Once you've signed in, add a new panel:

    ![Grafana-add-panel](./images/grafana-add-panel.png)

1. On the new panel, let's configure it to query for some information about our projects. We're going to use a very simple query to count the number of pods running in the namespace (feel free to use any other query). On the Panel settings, set the title to something sensible and add the query below. Hit save!

    ```bash
    sum(kube_pod_status_ready{namespace="<your-namespace>",condition="true"})
    ```

    ![new-panel](./images/new-panel.png)

1. With the new panel on our dashboard, let's see it in action by killing off some pods in our namespace

    ```bash
    oc delete pods -l app=review -n <your-namespace>
    oc delete pods -l app=review-web -n <your-namespace>
    ```

    ![Grafana-less-pods](./images/grafana-less-pods.png)

    <p class="tip">
    🐌 THIS IS NOT GitOps - Manually configuring the dashboard is a good way to play with Grafana. See advanced exercises for creating and storing the dashboard as code 🐎
    </p>
