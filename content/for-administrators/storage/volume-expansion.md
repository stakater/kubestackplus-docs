
# Volume Expansion

!!! info
    Volume Expansion is currently not supported on Stakater Cloud due to platform limitations. This feature may be available in future releases. You can follow the PVC Copy Tool workaround to resize or migrate PersistentVolumes if necessary.

SAAP offers volume expansion to expand volumes when they are running out of space. Volume expansion periodically checks the `kubelet_volume_stats_used_bytes` and `kubelet_volume_stats_capacity_bytes` published by the kubelets to decide when to expand a volume. These metrics are generated only when a volume is mounted to a pod. Also, the kubelet takes a minute or two to start generating accurate values for these metrics.

Volume expansion works based on the following annotations to PersistentVolumeClaim resources:

| Annotation               | Default                    | Description                                                                                                   |
| -------------------- | --------------------------------|----------------------------------------------------------------------------- |
|`volume-expander-operator.redhat-cop.io/autoexpand`|N/A|if set to "true" enables the volume-expansion to watch on this PVC|
|`volume-expander-operator.redhat-cop.io/polling-frequency`|"30s"|How frequently to poll the volume metrics|
|`volume-expander-operator.redhat-cop.io/expand-threshold-percent`|"80"|the percentage of used storage after which the volume will be expanded. This must be a positive integer|
|`volume-expander-operator.redhat-cop.io/expand-by-percent`|"25"|the percentage by which the volume will be expanded, relative to the current size. This must be an integer between 0 and 100|
|`volume-expander-operator.redhat-cop.io/expand-up-to`|MaxInt64|the upper bound for this volume to be expanded to. The default value is the largest quantity representable and is intended to be interpreted as infinite. If the default is used it is recommend to ensure the namespace has a quota on the used storage class|

Example:

Consider the example where below annotations configured on persistent volume claim.

```yaml
volume-expander-operator.redhat-cop.io/autoexpand: 'true'             # Enables the volume-expansion to watch on this PVC
volume-expander-operator.redhat-cop.io/expand-threshold-percent: "85" # Volume expansion will expand the volume when 85 percent of storage is consumed
volume-expander-operator.redhat-cop.io/expand-by-percent: "20"        # Volume expansion will expand PVC by 20 percent when 85 percent of storage is consumed
volume-expander-operator.redhat-cop.io/polling-frequency: "10m"       # Volume expansion poll the volume metrics after every 10 minutes
volume-expander-operator.redhat-cop.io/expand-up-to: "1Ti"            # Volume will be expanded no more than 1TB
```

# Pvc Copy Tool

The pvc copy tool is designed to resync the contents of one PersistentVolume (PV) to a newly created PersistentVolumeClaim (PVC). This tool is especially useful when migrating PersistentVolumes to a new StorageClass or when you need to resize a PV that belongs to a StorageClass that doesn’t support resizing.

The tool employs a workaround for reclaiming PVs, which is necessary to handle ReadWriteOnce (RWO) PVs. If you're working with a ReadWriteMany (RWX) PV, you can directly run a resync job and attach the Job-Pod to the existing PVC—there's no need to create a new PVC.

Use Cases

- Migrate PVs to different StorageClasses.
- Resize PVs that are using StorageClasses that don’t support resizing.
- Copy data from one PV to another, maintaining data integrity.

## How to Use

### Step-by-Step Process:

1. Clone the Repository: First, clone the repository that contains the pvc-copy-tool.

```bash
git clone https://github.com/stakater/pvc-copy-tool.git
```

2. Identify the PV to Copy: Find the PersistentVolume (PV) you wish to copy.

3. Change PV Reclaim Policy: Update the persistentVolumeReclaimPolicy of the PV to Retain.

4. Get PV Name: Retrieve the name of the PV you want to copy.

5. Deploy the Helm Chart: Apply the provided Helm chart, specifying:
   - The name of the PV in the values.yaml file.
   - The name, storage class, and size of the new PVC.

6. Delete the Original PVC: Delete the old PVC and remove the claimRef from the source PV.

7. Monitor the Job: The job will begin copying data from the original PV to the new PVC. The logs may show warnings about the inability to preserve the original file owners, but this is a known limitation due to OpenShift security settings and can be ignored.

8. Cleanup: After the data has been copied, the new PVC will be available, and you can remove the Helm chart.

## Rebinding the PV to the Original PVC

Once the data has been copied and the Job has been deleted, you can rebind the PV to the original PVC name. If you're using an inflexible operator, like openshift-image-operator, you may need to perform a "hot swap" with the PVC for the PV to be properly bound.

### Steps to Rebind:

1. Check New PV: Ensure the new PV has the persistentVolumeReclaimPolicy set to Retain and that the access mode matches the PVC you intend to bind it to.

2. Remove ClaimRef: Delete the PVC bound to the new PV and remove the ClaimRef from the PV.

3. Prepare PVC YAML: Copy the YAML definition for the PVC you plan to bind the PV to. Paste it into a file or use OpenShift's "Import YAML" dialog.

4. Update PVC YAML: Update the volumeName in the PVC YAML to point to your new PV.

5. Delete PVC and Pod: Delete the application's PVC and pod. Then quickly apply the updated PVC YAML to bind the new PV to the PVC.

6. Confirm Application: If successful, your application should now be using the newly copied PV, which is on the new StorageClass.

## Example Helm Chart Deployment for One-Off Job

To deploy the tool as a one-off job, you can use the following example Helm chart configuration:

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: pvc-copy-tool
  namespace: argocd
spec:
  destination:
    namespace: <target-namespace>
    server: https://kubernetes.default.svc
  source:
    path: pvc-copy-tool
    repoURL: ssh://git@github.com:stakater/pvc-copy-tool.git
    targetRevision: master
    helm:
      parameters:
        - name: oldPvName
          value: "<target-pv>"
        - name: newPvcName
          value: "image-registry-storage-clone"
        - name: newPvcStorageClass
          value: ""
        - name: newPvcSize
          value: "100Gi"
```

By following this process, you can effectively copy data from an existing PersistentVolume to a new PVC, ensuring the migration to new StorageClasses or resizing needs are met.
