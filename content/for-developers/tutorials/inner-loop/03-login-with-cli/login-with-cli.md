# Access Your Cluster

## Objectives

Access the lab/test cluster wit CLI.

## Key Results

- Login to the cluster with CLI.

## Tutorial

### Login with CLI

> If you to deploy resource in SAAP then enable sandbox namespace/project/environment for your tenant; you can read more [here](https://docs.stakater.com/mto/main/customresources.html). Find more on how  to access your SAAP cluster [here](../../outer-loop/access-cluster/access-cluster.md)

1. Login to your Openshift Console of your Lab/Test cluster.

1. On your `OpenShift Console` at the top right corner, click on your username and select `Copy login command`

    ![Copy login command](images/copy-login-command.png)

2. Click on `Display token` to view your token and login command.

    ![Display Token](images/display-token.png)

3. Copy your Log in command.

    ![Copy login token](images/copy-login-token.png)

4. From your workspaces command line, paste your login command and hit the `Enter` button. Your Workspaces Devlopement environment will now be able to interact safely with the SAAP cluster.

    ```bash
    oc login --token=<TOKEN> --server=<SERVER>
    ```
