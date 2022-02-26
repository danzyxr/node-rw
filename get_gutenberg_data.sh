#!/usr/bin/env bash
mkdir -p data/
wget -P data/ \
    http://www.gutenberg.org/cache/epub/feeds/rdf-files.tar.bz2
# Warning: fully extracted tar contains 100,000+ items at ~1GB
tar -xvjf rdf-files.tar.bz2
