# Persist your Application

Persistent storage is essential for preserving data in stateful applications deployed on Red Hat OpenShift. To ensure data persistence, OpenShift provides Persistent Volumes (PVs) and Persistent Volume Claims (PVCs) as abstractions for managing and allocating storage resources. This documentation will guide you through the process of persisting your application data using PVs and PVCs.

## Persistent Volumes (PVs)

A Persistent Volume represents a physical storage resource in the OpenShift cluster. PVs can be provisioned statically or dynamically based on the underlying storage infrastructure. To set up a PV for your application:

a. Define a PV configuration YAML file, specifying the storage type, size, access modes, and other parameters. For example:

"```"
apiVersion: v1
kind: PersistentVolume
metadata:
  name: `nordmart-pv`
spec:
  capacity:
    storage: 10Gi
  accessModes:
    - ReadWriteOnce
  persistentVolumeReclaimPolicy: Retain
  storageClassName: your-storage-class
  <storage-specific parameters>
"```"
In the above example, a PV named nordmart-pv is defined with a storage capacity of 10 gigabytes, read-write access mode, and a storage class specified. Additional storage-specific parameters can be provided based on the underlying storage infrastructure.

b. Apply the PV configuration to create the persistent volume:

`oc apply -f pv.yaml`

c. Once the PV is created, it will be available for use by PVCs in the cluster.

## Persistent Volume Claims (PVCs)

A Persistent Volume Claim represents a request for storage by an application. PVCs are used to bind PVs to application pods and provide a storage abstraction for application developers. To configure a PVC for your application:

a. Define a PVC configuration YAML file, specifying the storage request, access mode, and other parameters. For example:

"```"
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: nordmart-pvc
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 5Gi
  storageClassName: your-storage-class
"```"

In the above example, a PVC named `nordmart-pvc` is defined with a storage request of 5 gigabytes and a read-write access mode. The storage class specifies the desired type of storage.

b. Apply the PVC configuration to create the persistent volume claim:

`oc apply -f pvc.yaml`

c. Once the PVC is created, OpenShift will automatically bind it to an available PV that satisfies the requested storage class, size, and access mode.

### Mounting PVCs in Application Deployments

To make use of the PVC in your application deployment, you need to mount it as a volume within the application containers. Modify your deployment configuration YAML file as follows:

a. Add a volume definition that references the PVC:

"```"
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nordmart
spec:
  template:
    spec:
      volumes:
      - name: nordmart-data
        persistentVolumeClaim:
          claimName: nordmart-pvc
      containers:
      - name: nordmart-app
        image: your-image
        volumeMounts:
        - name: nordmart-data
"```"
