#!/usr/bin/env bash

npm run killer &> /dev/null

# tmux \
# new-session "npm run zmq-pub"\; \
# split-window "npm run zmq-sub"\; \
# split-window "npm run touch"\; \

gnome-terminal --tab -e "npm run zmq-pub" & \
gnome-terminal --tab -e "npm run zmq-sub" & \
gnome-terminal --tab -e "npm run touch" \
