#!/usr/bin/env bash

# gnome-terminal --tab -e \
# "node services/zmq_filer_reply.mjs" & \
# gnome-terminal --tab -e \
# "node services/zmq_filer_request.mjs target.txt" & \

# nodemon crashes because its watching files in data/cache/*

tmux \
new-session "nodemon --delay 500ms services/zmq_filer_reply.mjs"\; \
split-window "nodemon --delay 500ms services/zmq_filer_request.mjs target.txt"\; \
