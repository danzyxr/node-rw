import cluster from 'cluster';

let num_of_workers = 3;

if (cluster.isPrimary) {
  // Master
  console.log('Spawning workers');
  for (let i = 0; i < num_of_workers; i++) {
    cluster.fork();
  }
} else {
  // Worker
  // Do work
  console.log('Working');
}

cluster.on('online', (worker) => {
  console.log(`Worker ${worker.process.pid} is online`);
});

cluster.on('exit', (worker, code, signal) => {
  console.log(`Worker ${worker.process.pid} exited with code ${code}`);
  console.log('Signal:', signal);
});
