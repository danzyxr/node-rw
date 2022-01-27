import net from 'net';

const server = net.createServer((connection) => {
  console.log('Client connected');
  const chunk_1 = '{"type":"changed","timesta';
  const chunk_2 = 'mp":1640694370094}\n';

  connection.write(chunk_1); // Write immediately
  const write_after = setTimeout(() => {
    connection.write(chunk_2); // Write after 100ms
    connection.end();
  }, 100);

  connection.on('end', () => {
    clearTimeout(write_after);
    console.log('Client disconnected');
  });
});

server.listen(8080, function () {
  console.log('Listening for clients');
});
