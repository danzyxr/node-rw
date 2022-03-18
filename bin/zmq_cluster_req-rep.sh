#!/usr/bin/env bash

tmux \
    new-session "nodemon --delay 3000ms services/zmq_filer_reply_cluster.mjs"\; \
    split-window "nodemon --delay 3000ms services/zmq_filer_request.mjs target.txt"\; \
