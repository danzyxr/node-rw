# ntdd

References:
<https://pragprog.com/titles/jwnode2/node-js-8-the-right-way/>

---

## Problems

Running `net_watch_service.mjs` and `net_watch_client.mjs` together:

```error
SyntaxError: Unexpected token { in JSON at position 44
    at JSON.parse (<anonymous>)
    at Socket.<anonymous> (file:///home/dan/Documents/node-rw/networking/net_watch_client.mjs:6:24)
    at Socket.emit (node:events:390:28)
    at addChunk (node:internal/streams/readable:315:12)
    at readableAddChunk (node:internal/streams/readable:289:9)
    at Socket.Readable.push (node:internal/streams/readable:228:10)
    at TCP.onStreamRead (node:internal/stream_base_commons:199:23)
```

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

Solution:

- rewrite tests using common.js, or
- write a fs watcher in node to run mocha tests

`./database/rdf_json.mjs ./data/cache/epub/11/pg11.rdf`
