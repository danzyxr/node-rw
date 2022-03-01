#!/usr/bin/env bash

npm run killer &> /dev/null

tmux \
    new-session "nodemon networking/net_watch.mjs target.txt"\; \
    split-window "npm run nc-client"\; \
    split-window "npm run touch"\; \
