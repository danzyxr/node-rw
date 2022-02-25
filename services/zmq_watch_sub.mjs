import zmq from 'zeromq';

const subscriber = new zmq.Subscriber();
subscriber.subscribe(''); // Subscribe to all messages

// async function receive_msg() {
//   return await subscriber.receive();
// }

// receive_msg().then((m) => {
//   const message = JSON.parse(m);
//   const date = new Date(message.timestamp);
//   console.log(`File ${message.file} changed at ${date}`);
// });

subscriber.connect('tcp://localhost:8080');
