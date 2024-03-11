FROM python:3.12 as builder

# set workdir
RUN mkdir -p $HOME/application
WORKDIR $HOME/application

# Install plugins
RUN pip3 install mkdocs-material mkdocs-mermaid2-plugin mkdocs-table-reader-plugin  mkdocs-include-markdown-plugin

# copy the entire application
COPY --chown=1001:root . .
COPY fetch-pipeline-yamls.sh .

# Make the script executable
RUN chmod +x fetch-pipeline-yamls.sh

# Run the script to fetch pipeline YAMLs
RUN ./fetch-pipeline-yamls.sh

# build the docs
RUN mkdocs build

FROM nginxinc/nginx-unprivileged:1.25-alpine as deploy
COPY --from=builder $HOME/application/site/ /usr/share/nginx/html/saap/
COPY default.conf /etc/nginx/conf.d/

# set non-root user
USER 1001

LABEL name="Stakater App Agility Platform (SAAP) Documentation" \
      maintainer="Stakater <hello@stakater.com>" \
      vendor="Stakater" \
      release="1" \
      summary="Documentation for SAAP"

EXPOSE 8080:8080/tcp

CMD ["nginx", "-g", "daemon off;"]
