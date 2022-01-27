import net from 'net';

const client = net.connect({ port: 8080 });

client.on('data', (recieved) => {
  const message = JSON.parse(recieved);
  if (message.type === 'watching') {
    console.log(`Now watching: ${message.file}`);
  } else if (message.type === 'changed') {
    const timestamp_date = new Date(message.timestamp);
    console.log(`File changed: ${timestamp_date}`);
  } else {
    console.log(`What is this: ${message.type} ...?`);
  }
});

process.on('uncaughtException', (err) => {
  console.log(err);
});
