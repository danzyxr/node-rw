#!/usr/bin/env bash

# Kill 8080
npm run killer &> /dev/null

tmux \
new-session "npm run net-watch"\; \
split-window "npm run nc-client"\; \
split-window "npm run touch"\; \
