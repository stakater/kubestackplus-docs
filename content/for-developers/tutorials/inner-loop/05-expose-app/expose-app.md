# Expose Your Application

After successfully deploying your application on Red Hat OpenShift, you need to expose it to external traffic so that users can access your application over the network. This tutorial will guide you through the process of exposing your application and making it accessible from outside the OpenShift cluster.

## Route

OpenShift provides a routing mechanism called "routes" that allows you to expose applications using hostnames and paths. Routes are created using the Route resource and can provide additional features such as SSL termination and path-based routing.

### 1. Create a Route

a. Create a separate yaml file (e.g., route.yaml) or define it in your deployment configuration YAML file, and define a route using the following yaml:

```yaml
apiVersion: route.openshift.io/v1
kind: Route
metadata:
  name: nordmart-route
spec:
  host: nordmart.example.com
  to:
    kind: Service
    name: nordmart-service
```

In the above example, a route named `nordmart-route` is defined, pointing to the `nordmart-service` service.

### 2. Apply the Configuration

```sh
oc apply -f route.yaml
```

### 3. Create Application's Route Hostname DNS record

Once the route is created, it will assign a hostname (`nordmart.example.com`) that you can use to access your application externally.

> **Note:** In order to use a hostname, you must have a DNS record pointing to the OpenShift cluster's external IP or load balancer. Identify the responsible team to create a DNS record for your application's route hostname such as; `nordmart.example.com`.

By following the steps outlined above, you can successfully expose your application deployed on Red Hat OpenShift, using the example application "`nordmart`". Whether using the NodePort, LoadBalancer, or Route approach, you can make your application accessible from outside the OpenShift cluster, allowing users to access and interact with your application over the network.

## Service Type

In OpenShift, services are used to expose applications internally within the cluster. To expose your application externally, you need to specify the appropriate service type:

### a. NodePort

When using the NodePort service type, OpenShift assigns a random port within a predefined range on each node of the cluster.

#### 1. Create Service NodePort

Create a separate yaml file (e.g., svc-nodeport.yaml) or define it in your deployment configuration YAML file, and define a service using the following yaml:

```yaml
apiVersion: v1
kind: Service
metadata:
  name: nordmart-service
spec:
  type: NodePort
  ports:
    - port: 80
      targetPort: 8080
  selector:
    app: nordmart
```

In the above example, a service named `nordmart-service` is defined with the NodePort type, exposing port 80 and forwarding traffic to port 8080 of the application.

#### 2. Retrive the Port

To access your application externally, you need to determine the assigned port and the IP address of any of the cluster's nodes.

Retrieve the port assigned to the service by running the following command:

```sh
oc get service nordmart-service
```

#### 3. Identify the Port

Identify the port assigned to the NodePort field. This port will be used to access your application externally. The range of the port will be 30000-32767.

#### 4. Obtain the Node IP

Obtain the IP address of any node in the cluster:

```sh
oc get nodes -o wide
```

#### 5. Access the Application

Combine the node's IP address with the assigned port to access your application. For example: `http://<node-ip>:<assigned-port>`

### b. LoadBalancer

If your OpenShift cluster is running in a cloud environment that supports load balancers, you can use the LoadBalancer service type. This type automatically provisions a load balancer to distribute traffic to your application:

#### 1. Create Service LoadBalancer

Create a separate yaml file (e.g., svc-loadbalancer.yaml) or define it in your deployment configuration YAML file, and define a service using the following yaml:

```yaml
apiVersion: v1
kind: Service
metadata:
  name: nordmart-service
spec:
  type: LoadBalancer
  ports:
    - port: 80
      targetPort: 8080
  selector:
    app: nordmart
```

In the above example, a service named `nordmart-service` is defined with the LoadBalancer type, exposing port 80 and forwarding traffic to port 8080 of the application.

> **Note:** After applying the configuration, OpenShift will provision a load balancer in the cloud environment, which will route external traffic to your application.

#### 2. Obtain the LoadBalancer IP

Obtain the load balancer IP address or domain name provided by your cloud provider to access your application. For example: `http://<load-balancer-ip>:<port>`

## Whitelisting application routes

See [Additional route configurations](../../../../for-administrators/secure-your-cluster/secure-routes.md#additional-route-configuration) section on how to allow only whitelisted IPs for your application routes
