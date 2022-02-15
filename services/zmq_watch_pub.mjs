import fs from 'fs';
import zmq from 'zeromq';

const file_name = process.argv[2];
const publisher = new zmq.Publisher();

fs.watch(file_name, () => {
  publisher.send(
    JSON.stringify({
      type: 'changed',
      file: file_name,
      timestamp: Date.now()
    })
  );
});

publisher.bind('tcp://*:8080').catch((err) => {
  console.log(err);
  process.exit(1);
});

console.log('Listening for subscribers...');
