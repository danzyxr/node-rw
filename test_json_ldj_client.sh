#!/usr/bin/env bash

npm run killer &> /dev/null

tmux \
new-session "npm run test-json-service"\; \
split-window "npm run watch-ldj-client"\; \
