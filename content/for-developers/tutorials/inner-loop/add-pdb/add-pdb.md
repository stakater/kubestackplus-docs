# Using Pod Disruption Budgets (PDB) in SAAP

Pod Disruption Budget (PDB) is a crucial tool for maintaining the availability and stability of your applications in SAAP during updates and disruptions. By setting the minimum and maximum pod availability, you can ensure that your application remains operational even in the face of cluster changes.

In this tutorial, you will learn how to use Pod Disruption Budget (PDB) to manage the availability and stability of your applications in SAAP during updates and maintenance activities. PDB help ensure that a minimum number of pods are available and operational at all times, reducing the risk of service disruptions.

## Objectives

- Enable replicas.
- Configure a Pod Disruption Budget for an application deployed on SAAP.
- Observe the behavior of the PDB by deleting a pod and analyzing the changes in PDB status.

## Key Results

- Successfully enable and monitor a Pod Disruption Budget for the application's deployment on SAAP.

## Tutorial

Let's scale up the number of `replicas` to see how `pdb` works.

1. Add `replicas: 3` in `deploy/values.yaml`.

    ```yaml
    # Scale up replicas
    replicas: 3 # Number of replicas
    ```

    It should look like this

    ![replicas values](images/replicas-values.png)

    Make sure **autoscaling** is `enabled: false`, or you can scale up the `minReplicas` to match the replicas, that way you don't need to disable autoscaling.

    !!! note
        The indentation should be **application.deployment.replicas**.

1. Enable `pdb` in your `deploy/values.yaml` file. Add the following yaml:

    ```yaml
    # Enable Pod Disruption Budget (PDB) for your application's pods.
      pdb:
        # Set PDB enabled to true to activate the Pod Disruption Budget.
        enabled: true
        # Specify the minimum number of available pods during disruptions. In this case, ensure at least 1 pod is available at all times.
        minAvailable: 2
        # Specify the maximum number of pods that can be unavailable simultaneously during disruptions
        maxUnavailable: 2
    ```

    It should look like this:

    ![PDB values](images/pdb-values.png)

    Look at the different colors that indicates indentation.

    !!! note
        The indentation should be **application.pdb**.

1. Save and run `tilt up` at the root of your directory. Hit the space bar and the browser with `TILT` logs will be shown. If everything is green then the changes will be deployed on the cluster.

    Let's see the number of replicas.

1. Log in to SAAP. In your namespace check if the `replicaSet` has created the number of `replicaCounts` which is `3`.

    ![number of pods](images/number-of-pods.png)

1. To check if `pdb` is created, switch to your namespace, go to Administrator > Home > Search and search for `pdb`.

    ![PDB search](images/search-pdb.png)

1. Click on `PodDisruptionBudget` and see the newly created `pdb` named `review`.

    ![review PDB](images/review-pdb.png)

1. Click on `review` `pdb`. Go to `YAML`, scroll down and see the `status` of `pdb`. Check out the status and `currentHealthy: 3`, `desiredHealthy: 2` which satisfies the condition of `minAvailable: 2`. We can see the `DisruptionAllowed` status is `true`.

    ![review PDB yaml](images/review-pdb-yaml.png)

1. let's scale down the replicas to create a disruption and see if `pdb` works accurately.

    ```sh
    oc scale deployment review --replicas=1 -n <your-namespace>
    ```

    As soon as the replicas are scaled down, the `pdb` condition will enforce `replicaSet` to make sure the minimum replicas are available.

1. Delete the `review` pod and check the `pdb status`.

    ![scale down pods](images/scale-down.png)

1. Go to `pdb review`, and check the `status` now. Click on reload. Now look at the `currentHealthy: 1`, which clearly shows that `pdb` is working fine.

    ![after disruption](images/after-disruption.png)

    As soon as the pods are recreated, `pdb status` will change to `currentHealthy: 3` which meets the condition perfectly. Click on `reload` and you will see the updated status.

Remember that the behavior of the `PDB` and the speed at which it restores pod availability may be influenced by factors such as node resources, cluster conditions, and pod scheduling rules. It's important to give the system some time to react and observe how it gradually restores the desired number of healthy pods according to the `PDB` constraints.

Awesome! Let's move on to the next tutorial to add a network policy to your application.
