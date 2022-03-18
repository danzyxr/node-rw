#!/usr/bin/env bash

tmux \
    new-session "nodemon --delay 1500ms services/zmq_filer_reply_cluster.mjs"\; \
    split-window "nodemon --delay 1500ms services/zmq_filer_request.mjs target.txt"\; \
