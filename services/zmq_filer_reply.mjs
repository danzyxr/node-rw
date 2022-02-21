import fs from 'fs';
import zmq from 'zeromq';

const responder = new zmq.Reply();

async function receive_request() {
  return await responder.receive();
}

receive_request().then((req) => {
  const request = JSON.parse(req);
  console.log(`Received request to get: ${request.path}`);
  fs.readFile(request.path, (err, content) => {
    responder.send(
      JSON.stringify({
        content: content.toString(),
        timestamp: Date.now(),
        pid: process.pid
      })
    );
  });
});

console.log('Listening for zmq requests');

responder.bind('tcp://127.0.0.1:8080').catch((err) => {
  console.log(err);
});

// process.on('SIGINT', () => {
//   console.log('Shutting down...');
//   responder.close();
// });
