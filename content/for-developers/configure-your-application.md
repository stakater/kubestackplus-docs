# Configure your Application

## Adding secrets and configMap

n Red Hat OpenShift, secrets are used to store sensitive information such as passwords, API keys, and certificates that are required by applications during deployment. These secrets can be securely managed and accessed by the applications running within the OpenShift cluster. This documentation will guide you through various ways to utilize secrets within your application deployment.

### Environment Variables

Environment variables allow you to pass sensitive information as configuration parameters to your application containers. To use the secret in your deployment's environment variables:

a. Define the secret as an environment variable directly in your deployment configuration YAML file, like this:

"```"
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nordmart
spec:
  template:
    spec:
      containers:
      - name: nordmart-app
        image: your-image
        env:
        - name: DATABASE_PASSWORD
          valueFrom:
            secretKeyRef:
              name: your-secret
              key: `database_password`
"```"
In the above example, the DATABASE_PASSWORD environment variable is set using the database_password key from the your-secret secret.

Alternatively, we can use envFrom to get values for environment variable:

"```"
        envFrom:
        - configMapRef:
            name: env-configmap
        - secretRef:
            name: env-secrets
"```"

### Volumes and Mounts

You can also mount secrets as files in your application containers, enabling direct file access within your application code. To mount a secret as a file:

a. Define a volume that references the secret in your deployment configuration YAML file:

"```"
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nordmart
spec:
  template:
    spec:
      containers:
      - name: nordmart-app
        image: your-image
        volumeMounts:
        - name: secret-volume
          mountPath: /etc/secrets
    volumes:
    - name: secret-volume
      secret:
        secretName: your-secret
"```"
In the above example, the your-secret secret is mounted as a volume named secret-volume at the path /etc/secrets within the container.

### Using Secrets in Configuration Files

If your application requires a configuration file with sensitive information, you can use a ConfigMap to store the file and mount it as a volume. The ConfigMap can be populated with the contents of the secret. To use secrets in configuration files:

a. Create a ConfigMap that includes the secret's data:

`oc create configmap your-configmap --from-file=config.yml=secret_file.yml`

Mount the ConfigMap as a volume in your deployment configuration YAML file:

"```"
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nordmart
spec:
  template:
    spec:
      containers:
      - name: nordmart-app
        image: your-image
        volumeMounts:
        - name: config-volume
          mountPath: /etc/config
    volumes:
    - name: config-volume
      configMap:
        name: your-configmap
"```"

In the above example, the your-configmap ConfigMap is mounted as a volume named config-volume at the path /etc/config within the container.
