#!/usr/bin/env bash

npm run killer &> /dev/null

tmux \
    new-session "npm run net-watch"\; \
    split-window "npm run nc-client"\; \
    split-window "npm run touch"\; \
