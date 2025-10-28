FROM python:3.13 AS builder

RUN pip3 install mkdocs-mermaid2-plugin mkdocs-table-reader-plugin mkdocs-include-markdown-plugin mkdocs-video

# set workdir
RUN mkdir -p $HOME/application
WORKDIR $HOME/application

# copy the entire application
COPY --chown=1001:root . .

# build the docs
RUN chmod +x prepare_theme.sh && ./prepare_theme.sh
RUN mkdocs build
FROM nginxinc/nginx-unprivileged:1.29-alpine AS deploy
COPY --from=builder $HOME/application/site/ /usr/share/nginx/html/kubestackplus/
COPY default.conf /etc/nginx/conf.d/

# set non-root user
USER 1001

LABEL name="Stakater KubeStack+ Documentation" \
      maintainer="Stakater <hello@stakater.com>" \
      vendor="Stakater" \
      release="1" \
      summary="Documentation for Stakater KubeStack+"

EXPOSE 8080:8080/tcp

CMD ["nginx", "-g", "daemon off;"]
