import net from 'net';
import LDJClient from './lib/ldj_client.mjs';

const net_client = net.connect({ port: 8080 });
const ldj_client = LDJClient.connect(net_client);

ldj_client.on('message', (message) => {
  if (message.type === 'watching') {
    console.log(`Now watching: ${message.file}`);
  } else if (message.type === 'changed') {
    console.log(`File changed: ${new Date(message.timestamp)}`);
  } else {
    throw Error(`Unrecognized message type: ${message.type}`);
  }
});
