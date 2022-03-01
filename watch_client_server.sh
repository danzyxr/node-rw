#!/usr/bin/env bash

npm run killer &> /dev/null

tmux \
    new-session "nodemon networking/watch_service.mjs target.txt"\; \
    split-window "nodemon networking/watch_client.mjs"\; \
    split-window "npm run touch"\; \
