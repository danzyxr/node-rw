import fs from 'fs';
import zmq from 'zeromq';

async function init_responder() {
  const responder = new zmq.Reply();
  await responder.bind('tcp://127.0.0.1:8080');
  console.log('Responder bound to port 8080, listening for requests...');

  for await (const [msg] of responder) {
    let reply = '';
    const request = JSON.parse(msg);
    console.log(`\nReceived request for: ${request.path}\n`);
    fs.readFile(request.path, (err, data) => {
      console.log(`err: ${err}`);
      console.log(`data: ${data}`);
      reply = JSON.stringify({
        content: data.toString(),
        timestamp: Date.now(),
        pid: process.pid
      });
      console.log(`reply: ${reply}`);
      responder.send(reply);
    });
  }
}

init_responder();

process.once('SIGUSR2', () => {
  process.kill(process.pid, 'SIGUSR2');
});

process.on('SIGINT', () => {
  process.kill(process.pid, 'SIGINT');
});
