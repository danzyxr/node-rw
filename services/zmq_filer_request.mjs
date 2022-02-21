import zmq from 'zeromq';

const file_name = process.argv[2];
const requester = new zmq.Request();

async function receive_reply() {
  return await requester.receive();
}

receive_reply().then((rep) => {
  const reply = JSON.parse(rep);
  console.log('Received reply:', reply);
});

requester.connect('tcp://localhost:8080');

async function send_request() {
  console.log(`Sending request for ${file_name}`);
  await requester.send(JSON.stringify({ path: file_name }));
}

send_request();
