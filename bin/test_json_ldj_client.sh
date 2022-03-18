#!/usr/bin/env bash

tmux \
    new-session "nodemon networking/test_json_service.mjs"\; \
    split-window "nodemon networking/watch_ldj_client.mjs"\; \
