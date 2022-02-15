import zmq from 'zeromq';

const socket = new zmq.Subscriber();
socket.subscribe(''); // Subscribe to all messages

async function receive_msg() {
  return await socket.receive();
}

receive_msg().then((m) => {
  const message = JSON.parse(m);
  const date = new Date(message.timestamp);
  console.log(`File ${message.file} changed at ${date}`);
});

socket.connect('tcp://localhost:8080');
