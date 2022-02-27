#!/usr/bin/env bash

gnome-terminal --tab -e \
"node services/zmq_filer_reply.mjs" & \
gnome-terminal --tab -e \
"node services/zmq_filer_request.mjs target.txt" & \

# nodemon crashes because its watching files in data/cache/*

# tmux \
# new-session "nodemon services/zmq_filer_reply.mjs"\; \
# split-window "nodemon services/zmq_filer_request.mjs target.txt"\; \
