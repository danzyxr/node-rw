import fs from 'fs';
import cluster from 'cluster';
import os from 'os';
import zmq from '../node_modules/zeromq/v5-compat.js';

const num_of_workers = os.cpus().length;

if (cluster.isPrimary) {
  const router = zmq.socket('router');
  const dealer = zmq.socket('dealer');

  router.bind('tcp://127.0.0.1:8080');
  dealer.bind('ipc://filer-dealer.ipc');

  router.on('message', (...msg) => {
    dealer.send(msg);
  });

  dealer.on('message', (...msg) => {
    router.send(msg);
  });

  cluster.on('online', (worker) => {
    console.log(`Worker ${worker.process.pid} is now online`);
  });

  console.log(`Forking ${num_of_workers} clusters`);

  for (let i = 0; i < num_of_workers; i++) {
    cluster.fork();
  }
} else {
  const responder = zmq.socket('rep');
  responder.connect('ipc://filer-dealer.ipc');

  responder.on('message', (msg) => {
    const request = JSON.parse(msg);
    console.log(`${process.pid} requesting ${request.path}`);

    fs.readFile(request.path, (err, file_data) => {
      console.log(`Response sent from ${process.pid}`);
      responder.send(
        JSON.stringify({
          content: file_data.toString(),
          timestamp: Date.now(),
          pid: process.id
        })
      );
    });
  });
}
