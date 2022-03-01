import zmq from 'zeromq';

async function init_subscriber() {
  const subscriber = new zmq.Subscriber();
  subscriber.connect('tcp://127.0.0.1:8080');
  console.log('Subscriber connected to port 8080');
  subscriber.subscribe(''); // Subscribe to all messages

  for await (const [msg] of subscriber) {
    console.log(`Received message: ${msg}`);
    const message = JSON.parse(msg);
    const date = new Date(message.timestamp);
    console.log(`File ${message.file} changed at ${date}`);
  }
}

init_subscriber();
