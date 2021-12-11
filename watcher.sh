#!/usr/bin/env bash

npm run killer

# gnome-terminal \
# --tab -e "npm run watch-service" \
# --tab -e "npm run watch-client" \
# --tab -e "npm run touch"

tmux \
new-session "npm run watch-service"\; \
split-window "npm run watch-client"\; \
split-window "npm run touch"\; \
