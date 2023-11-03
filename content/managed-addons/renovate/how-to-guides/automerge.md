# How to automate upgrading dependencies

Renovate can auto-merge pull requests, and the pros and cons for that is well described on their [official doc site](https://docs.renovatebot.com/key-concepts/automerge/).

This is how it can be enabled in a GitHub repository:

1. In `renovate.json`, add a package rule for matching documentation Docker images. For example, if all Docker images follow the naming practice of having a prefix `-docs`, this package rule would match all those packages:

    ```json
    "packageRules": [
        {
        "matchPackagePatterns": ["-docs"],
        "automerge": true
        }
    ]
    ```

1. Install the `renovate-approve` GitHub app and give it permissions for the repository running Renovate - the app is needed for doing the actual PR approvals
1. Modify the settings of the repo to `Allow auto-merge`

The result is that Renovate would automatically merge pull requests if workflows have succeeded.
