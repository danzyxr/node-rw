#!/usr/bin/env bash

# Kill 8080
npm run killer

tmux \
new-session "npm run watch-service"\; \
split-window "npm run watch-client"\; \
split-window "npm run touch"\; \
