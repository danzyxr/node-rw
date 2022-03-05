#!/usr/bin/env bash

tmux \
    new-session "nodemon --delay 1000ms services/zmq_watch_pub.mjs target.txt"\; \
    split-window "nodemon --delay 1000ms services/zmq_watch_sub.mjs"\; \
