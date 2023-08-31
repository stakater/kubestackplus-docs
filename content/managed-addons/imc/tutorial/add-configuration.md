# Adding configuration

SAAP uses UptimeRobot free tier as uptime checker, by default.

Uptime checker is configured in the `config.yaml` based on uptime provider.
A secret named
`imc-config` is created that holds `config.yaml` key:

```yaml
kind: Secret
apiVersion: v1
metadata:
  name: imc-config
data:
  config.yaml: >-
    <BASE64_ENCODED_CONFIG.YAML>
type: Opaque
```

Examples for different uptime checkers can be found in the [IMC Examples Directory](https://github.com/stakater/IngressMonitorController/tree/master/examples/configs).
