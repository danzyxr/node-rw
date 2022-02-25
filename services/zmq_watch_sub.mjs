import zmq from 'zeromq';

async function init_subscriber() {
  const subscriber = new zmq.Subscriber();
  subscriber.connect('tcp://localhost:8080');
  console.log('Subscriber connected to port 8080');
  subscriber.subscribe(''); // Subscribe to all messages
  for await (const [topic, msg] of subscriber) {
    console.log(`Received topic: ${topic} and message: ${msg}`);
    const message = JSON.parse(msg);
    const date = new Date(message.timestamp);
    console.log(`File ${message.file} changed at ${date}`);
  }
}

init_subscriber();

// async function receive_msg() {
//   return await subscriber.receive();
// }

// receive_msg().then((m) => {
//   const message = JSON.parse(m);
//   const date = new Date(message.timestamp);
//   console.log(`File ${message.file} changed at ${date}`);
// });
