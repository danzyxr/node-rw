import zmq from 'zeromq';

const file_name = process.argv[2];

async function init_requester() {
  const requester = new zmq.Request();
  requester.connect('tcp://127.0.0.1:8080');
  console.log('Requester connected to 8080');

  for (let i = 0; i < 5; i++) {
    await requester.send(JSON.stringify({ path: file_name }));
    console.log(`Awaiting reply for request: ${file_name}`);
    const [msg] = await requester.receive();
    console.log('Received reply:', JSON.parse(msg));
  }

  console.log('Done!');
}

init_requester();
