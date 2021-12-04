import fs from 'fs';
import net from 'net';

const filename = process.argv[2];

if (!filename) {
  throw new Error('No filename found');
}

const watch_server = net.createServer((c) => {
  console.log(`Client connected\n${c}`);
  c.write(JSON.stringify({ type: 'watching', file: filename }) + '\n');
  const watcher = fs.watch(filename, () => {
    c.write(JSON.stringify({ type: 'changes', timestamp: Date.now() }) + '\n');
  });
  c.on('close', () => {
    console.log('Disconnecting');
    watcher.close();
  });
});

watch_server.listen(8080, () => {
  console.log('Listening for connections');
});

// In 3 different terminals
// 1. watch -n 3 touch target.txt
// 2. nodemon net_watch_service.mjs target.txt
// 3. nc localhost 8080 (or telnet localhost 8080)
