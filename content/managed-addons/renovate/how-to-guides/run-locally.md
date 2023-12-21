# Local development

Sometimes you need to run Renovate locally to be able to troubleshoot issues or verify local configurations.

## Config validation

To validate your Renovate configuration:

1. Install Renovate locally
1. Run `renovate-config-validator <config-file>`, for example:

    ```sh
    $ renovate-config-validator renovate.json
    DEBUG: Using RE2 as regex engine
    (node:15692) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
    (Use `node --trace-deprecation ...` to show where the warning was created)
    INFO: Validating renovate.json
    INFO: Config validated successfully
    ```

## Run Renovate locally

To run Renovate locally:

1. Install Renovate locally: `brew install renovate`

1. If you use encrypted secrets in the configuration and you want to use the local configuration file, you need to create locally encrypted secrets
    1. Create a local copy of the index file in [Mend Renovate App secrets encryption](https://app.renovatebot.com/encrypt)
    1. Replace the public key in the local html, see [`privateKey` config](https://docs.renovatebot.com/self-hosted-configuration/#privatekey)
    1. Encrypt any passwords and replace them temporarily in the local config file
    1. RENOVATE_CONFIG_FILE should point to the local config file
    1. RENOVATE_PRIVATE_KEY_PATH must be set
1. RENOVATE_TOKEN need to be created and set
1. LOG_LEVEL should be set as applicable
1. Run a dry-run from anywhere because it clones the repo in a cached location: `renovate --dry-run="full" --require-config="ignored" "stakater/saap-docs"`
