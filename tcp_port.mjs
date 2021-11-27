import net from 'net';

const server = net.createServer((socket) => {
  socket.on('data', (data) => {
    socket.write(data);
  });
});

server.listen(8080);
