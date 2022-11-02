# ntdd

References:
<https://pragprog.com/titles/jwnode2/node-js-8-the-right-way/>

---

## Using Docker-ELK

Exposed ports:

5044:  Logstash Beats input
50000: Logstash TCP input
9600:  Logstash monitoring API
9200:  Elasticsearch HTTP
9300:  Elasticsearch TCP transport
5601:  Kibana

## Problems

Plenty of problems trying to get Docker, Elasticsearch, Kibana, etc. working in
the first place, but I found [this](https://github.com/deviantony/docker-elk) template.

When running `mocha --watch`:  

```error
Error [ERR_REQUIRE_ESM]: require() of ES Module /home/dan/d/node-rw/networking/test/ldj_client_test.mjs not supported.
Instead change the require of /home/dan/d/node-rw/networking/test/ldj_client_test.mjs to a dynamic import() which is available in all CommonJS modules.
    at /home/dan/d/node-rw/node_modules/mocha/lib/mocha.js:427:36
    at Array.forEach (<anonymous>)
    at Mocha.loadFiles (/home/dan/d/node-rw/node_modules/mocha/lib/mocha.js:424:14)
    at Mocha.run (/home/dan/d/node-rw/node_modules/mocha/lib/mocha.js:1025:10)
    at Object.run (/home/dan/d/node-rw/node_modules/mocha/lib/cli/watch-run.js:263:22)
    at FSWatcher.<anonymous> (/home/dan/d/node-rw/node_modules/mocha/lib/cli/watch-run.js:184:14)
```

<https://github.com/mochajs/mocha/issues/4625>  
<https://github.com/standard-things/esm/issues/868>

`./database/rdf_json.mjs ./data/cache/epub/11/pg11.rdf`
