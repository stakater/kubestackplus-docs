# Enable logging for your Application

Logging is enabled by default for all applications running to the cluster. To see these logs, head over to Kibana through Forecastle.

## How to access logs on Kibana?

Below are the steps to access logs on Kibana on your first login.

Go to `Management` > `Index-Patterns` and you will see the below screen, enter `*` in the `Index Pattern` text box and click `Next step`:

![Kibana_Page_1](./images/kibana_index_page1.png)

From the drop-down `Time filter` field name select `@timestamp` and click `Create index pattern`:

![Kibana_Page_2](./images/kibana_index_page2.png)

Now you can go to `Discover` tab to view the logs.
