# Stakater App Agility Platform (SAAP) Documentation

SAAP docs are built using [MkDocs](https://github.com/mkdocs/mkdocs) which is based on Python.

## GitHub Actions

This repository has GitHub action workflow which checks the quality of the documentation and builds the Dockerfile image on Pull Requests. On a push to the main branch, it will create a GitHub release and push the built Dockerfile image to an image repository.

## Build locally

There are at least three options to get fast continuous feedback during local development:

1. Build and run the docs using the Dockerfile image
1. Run the commands locally
1. Use Tilt

### Build Dockerfile image and run container

Checkout remote module:

```bash
git submodule update --init --recursive --remote
```

Build Dockerfile test image:

```bash
docker build . -t test
```

Run test container:

```bash
docker run -p 8080:8080 test
```

Then access the docs on [`localhost:8080/saap`](localhost:8080/saap).

### Run commands locally

Use [virtualenvwrapper](https://virtualenvwrapper.readthedocs.io/en/latest/install.html) to set up Python virtual environments.

Install [Python 3](https://www.python.org/downloads/).

Install mkdocs-material and mermaid plugin:

```bash
pip3 install mkdocs-material mkdocs-mermaid2-plugin
```

Install mkdocs-include-markdown-plugin (if not installed by default and gives an error):

```bash
pip install mkdocs-include-markdown-plugin
```

Finally, serve the docs using the built-in web server which is based on Python http server - note that the production build will use `nginx` instead:

```bash
mkdocs serve
```

or

```bash
python3 -m mkdocs serve
```

### QA Checks

Markdown linting:

```bash
brew install markdownlint-cli
markdownlint -c .markdownlint.yaml content
```

Spell checking:

```bash
brew install vale
vale content
```

## Use Tilt

Install [Tilt](https://docs.tilt.dev/index.html), then run:

```bash
tilt up
```

Files `main.html` and `404.html` are served from `theme_common` rather than override since they are to be consistent throughout. If anything changes they can be served via `theme_override`.

To execute the prepare theme command after setup you need to add the `prepare_theme.sh` or copy and paste bash file using sudo command file to your root directory and then run the following command:


```bash
chmod +x prepare_theme.sh
```
