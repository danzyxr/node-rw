#!/usr/bin/env bash

npm run killer &> /dev/null

tmux \
    new-session "nodemon networking/test_json_service.mjs"\; \
    split-window "nodemon networking/watch_client.mjs"\; \
