# Custom Resources

## PodMetadataInjector

`PodMetadataInjector` uses labels to select pods and adds the specified annotations to those pods, so they can be used by `KonfiguratorTemplate` for go-templating. More details at [PodMetadataInjector](https://github.com/stakater/Konfigurator/blob/master/docs/PodMetadataInjector.md).

## KonfiguratorTemplate

`KonfiguratorTemplate` takes a go-template and translates it into a configmap or a secret, which is then mounted into either Deployment, DaemonSet or StatefulSet as a volume, depending on the details provided in its spec. More details at [KonfiguratorTemplate](https://github.com/stakater/Konfigurator/blob/master/docs/PodMetadataInjector.md).
