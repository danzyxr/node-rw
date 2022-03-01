#!/usr/bin/env bash

tmux \
    new-session "nodemon --delay 500ms services/zmq_filer_reply.mjs"\; \
    split-window "nodemon --delay 500ms services/zmq_filer_request.mjs target.txt"\; \
