#!/bin/bash

REMOTE_URL="https://raw.githubusercontent.com/NordMart/review-api/main/.tekton/git_clone.yaml"
LOCAL_FILE="./content/for-developers/tutorials/outer-loop/add-ci-pipeline/yamls/git_clone.yaml"

# Check if the local file exists
if [ -f "$LOCAL_FILE" ]; then
    echo "File $LOCAL_FILE exists. Replacing..."
    rm "$LOCAL_FILE"
fi

# Download the file
curl -L "$REMOTE_URL" -o "$LOCAL_FILE"
