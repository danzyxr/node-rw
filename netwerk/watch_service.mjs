import fs from 'fs';
import net from 'net';

const file_name = process.argv[2];

if (!file_name) {
  throw Error('No file found in argv');
}

const watch_server = net.createServer((connection) => {
  console.log(`Client connected\n${connection}`);
  connection.write(JSON.stringify({ type: 'watching', file: file_name }));
  const watcher = fs.watch(file_name, () => {
    connection.write(JSON.stringify({ type: 'changed', timestamp: Date.now() }));
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
// 1. node 'netwerk/watch_service.mjs' target.txt
// 2. node 'netwerk/watch_client.mjs'
// 3. watch -n 3 touch target.txt
