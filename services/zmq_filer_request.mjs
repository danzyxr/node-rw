import zmq from 'zeromq';

const file_name = process.argv[2];
const requester = new zmq.Request();

// async function receive_reply() {
//   return await requester.receive();
// }

// for await (const [msg] of requester) {
//   const reply = JSON.parse(...msg);
//   console.log('Received reply:', reply);
// }

// receive_reply().then((rep) => {
//   const reply = JSON.parse(rep);
//   console.log('Received reply:', reply);
// });

requester.connect('tcp://127.0.0.1:8080');

for (let i = 0; i < 5; i++) {
  await requester.send(JSON.stringify({ path: file_name }));
  console.log(`Sent request for ${file_name}`);
}

// nodemon services/zmq_filer_request.mjs target.txt
// Doesn't work with zmq_filer_reply_cluster.mjs
