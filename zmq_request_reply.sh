#!/usr/bin/env bash

# gnome-terminal --tab -e \
# "nodemon services/zmq_filer_reply.mjs" & \
# gnome-terminal --tab -e \
# "nodemon services/zmq_filer_request.mjs target.txt" & \

tmux \
new-session "nodemon services/zmq_filer_reply.mjs"\; \
split-window "nodemon services/zmq_filer_request.mjs target.txt"\; \
