# node-rw

Yes, more `node`. The `r`ight `w`ay (Jim R. Wilson).

---

## Problems

Running `net_watch_service` and `net_watch_client.mjs` together:
Sometimes this happens:

```error
SyntaxError: Unexpected token { in JSON at position 44
    at JSON.parse (<anonymous>)
    at Socket.<anonymous> (file:///home/dan/Documents/node-rw/netwerk/net_watch_client.mjs:6:24)
    at Socket.emit (node:events:390:28)
    at addChunk (node:internal/streams/readable:315:12)
    at readableAddChunk (node:internal/streams/readable:289:9)
    at Socket.Readable.push (node:internal/streams/readable:228:10)
    at TCP.onStreamRead (node:internal/stream_base_commons:199:23)
```
