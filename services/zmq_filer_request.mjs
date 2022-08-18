import zmq from '../node_modules/zeromq/v5-compat.js';

const file_name = process.argv[2];

const requester = zmq.socket('req');
console.log('Requester connected to 8080');

requester.on('message', (data) => {
  const response = JSON.parse(data);
  console.log(response);
});

requester.connect('tcp://127.0.0.1:8080');

for (let i = 0; i < 5; i++) {
  requester.send(JSON.stringify({ path: file_name }));
}

console.log('Done!');
