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

  for await (const [msg] of router) {
    console.log('a', msg);
    await dealer.send(msg);
  }
  for await (const [msg] of dealer) {
    console.log('b', msg);
    await router.send(msg);
  }

  cluster.on('online', (worker) => {
    console.log(`Worker ${worker.process.pid} is now online`);
  });

  for (let i = 0; i < num_of_workers; i++) {
    cluster.fork();
  }
} else {
  const responder = new zmq.Reply();
  await responder.bind('ipc://filer-dealer.ipc');
  console.log('Worker bound to filer-dealer');
  for await (const [msg] of responder) {
    console.log('Inside await of reply socket');
    const request = JSON.parse(msg);
    console.log(`${process.pid} requesting ${request.path}`);
    fs.readFile(request.path, (err, data) => {
      console.log(`Response sent from ${process.pid}`);
      responder.send(
        JSON.stringify({
          content: data.toString(),
          timestamp: Date.now(),
          pid: process.id
        })
      );
    });
  }
}
