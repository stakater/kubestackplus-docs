# Access Redis CLI via Port Forward

This documentation will help to connect to managed Redis via `redis-cli` using port forward.

## CLI Setup

The first step is to setup `redis-cli` on your local machine. For this, go through following steps. If you already have CLI setup, you can skip this section.

- Run following command in terminal

  ```shell
  sudo apt install redis-tools
  ```

- Run following command to verify CLI installation.

  ```shell
  redis-cli --version
  ```

## Create Port Forwarding to Redis Service

Before running `redis-cli` command we need to port forward to redis service running in cluster. To achieve this, perform following steps:

- In OpenShift console, click on your username on top right corner and click `Copy login command` as shown below:
  ![`OpenShift Console`](../images/openshift-console.png)
- Click on `Display Token` and then copy `oc login` command.
- Run this command inside your terminal. Now you have access to interact with your cluster using terminal.
- Run following command to locate service to which we need to create port forward.

  ```shell
  oc get svc -n <redis-namespace>  
  ```
 
  Here `<redis-namespace>` is the name of namespace where redis is deployed (In current case its value is `bitnami-redis`). This name might be different for you. You can ask about this to cluster admin.
- You'll get an output similar to one shown below:
  ![`Redis Services`](../images/redis-services.png)
- Run the following command to create port forward.
  
  ```shell
  oc port-forward svc/<service-name> <port> -n <redis-namespace>
  ```

    - `<service-name>` is the name of service that has `CLUSTER-IP` assigned. In current case its value is `bitnami-redis`.
    - `<port>` is the port number for this service to which we need to create port forward. For sentinel mode we need to port forward to port `26379` otherwise to `6379`.
- This should result in following output:
  ![`Redis Port Forward`](../images/redis-port-forward.png)
- At this moment, you need to open a second terminal (while keeping this running) and run following command:
  
  ```shell
  redis-cli -h 127.0.0.1 -p <port> -a <password>
  ```
  
    - Here `<password>` should be replaced by password used to connect to redis. This password can easily be retrieved from Vault.
- At this moment, you should have access to `redis-cli`. As shown below by doing a simple operation on redis.
![`Redis CLI`](../images/redis-cli.png)
