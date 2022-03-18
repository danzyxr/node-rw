import fs from 'fs';
import cluster from 'cluster';
import os from 'os';
import zmq from 'zeromq';

const num_of_workers = os.cpus().length;

if (cluster.isPrimary) {
  const router = new zmq.Router();
  const dealer = new zmq.Dealer();

  async function bind_sockets() {
    await router.bind('tcp://127.0.0.1:8080');
    await dealer.bind('ipc://filer-dealer.ipc');
  }

  async function await_router() {
    for await (const [msg] of router) {
      console.log('Dealer received: ', msg.toString());
      await dealer.send(msg);
    }
  }

  async function await_dealer() {
    for await (const [msg] of dealer) {
      console.log('Router received: ', msg.toString());
      await router.send(msg);
    }
  }

  await bind_sockets();

  cluster.on('online', (worker) => {
    console.log(`Worker ${worker.process.pid} is now online`);
  });

  console.log(`Forking ${num_of_workers} clusters`);

  for (let i = 0; i < num_of_workers; i++) {
    cluster.fork();
  }

  await await_router();
  await await_dealer();
} else {
  async function run_cluster() {
    const responder = new zmq.Reply();
    await responder.bind('ipc://filer-dealer.ipc');
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
  run_cluster();
}
