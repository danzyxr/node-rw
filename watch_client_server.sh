#!/usr/bin/env bash

npm run killer &> /dev/null

tmux \
    new-session "npm run watch-service"\; \
    split-window "npm run watch-client"\; \
    split-window "npm run touch"\; \
