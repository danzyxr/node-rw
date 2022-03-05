#!/usr/bin/env bash

tmux \
    new-session "nodemon networking/watch_service.mjs target.txt"\; \
    split-window "nodemon networking/watch_client.mjs"\; \
    split-window "npm run touch"\; \
