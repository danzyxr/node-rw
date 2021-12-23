import fs from 'fs';
import net from 'net';

const file_name = process.argv[2];

if (!file_name) {
  throw new Error('No file found in argv');
}

const watch_server = net.createServer((connection) => {
  console.log(`Client connected\n${connection}`);
  connection.write(`Watching ${file_name}\n`);
  const watcher = fs.watch(file_name, () => {
    connection.write(`File changed: ${new Date()}\n`);
  });
  connection.on('close', () => {
    console.log('Disconnecting');
    watcher.close();
  });
});

watch_server.listen(8080, () => {
  console.log('Listening for connections');
});

// In 3 different terminals:
// 1. node 'netwerk/net_watch.mjs' target.txt
// 2. nc localhost 8080
// 3. watch -n 3 touch target.txt
