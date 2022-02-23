import fs from 'fs';
import cluster from 'cluster';
import os from 'os';
import zmq from 'zeromq';

const num_of_workers = os.cpus().length;

if (cluster.isPrimary) {
  const router = new zmq.Router();
  const dealer = new zmq.Dealer();

  await router.bind('tcp://127.0.0.1:8080');
  await dealer.bind('ipc://filer-dealer.ipc');
  router.receive().then((...frames) => dealer.send(frames));
  dealer.receive().then((...frames) => router.send(frames));

  cluster.on('online', (worker) => {
    console.log(`Worker ${worker.process.pid} is now online`);
  });

  for (let i = 0; i < num_of_workers; i++) {
    cluster.fork();
  }
} else {
  const responder = new zmq.Reply();
  responder.receive().then((req) => {
    const request = JSON.parse(req);
    console.log(`${process.pid} requesting ${request.path}`);
    fs.readFile(request.path, (err, content) => {
      console.log(`Response sent from ${process.pid}`);
      responder.send(
        JSON.stringify({
          content: content.toString(),
          timestamp: Date.now(),
          pid: process.id
        })
      );
    });
  });
}

// nodemon services/zmq_filer_reply_cluster.mjs
// Doesn't work with zmq_filer_request.mjs
