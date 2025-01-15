# KonfiguratorTemplate

`KonfiguratorTemplate` takes a go-template and translates it into a configmap or a secret, which is then mounted into either Deployment, Daemonset or StatefulSet as a volume, depending on the details provided in its spec. More details at [KonfiguratorTemplate](https://github.com/stakater/Konfigurator/blob/master/docs/PodMetadataInjector.md).
