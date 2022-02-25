import fs from 'fs';
import zmq from 'zeromq';

const file_name = process.argv[2];
async function init_publisher() {
  const publisher = new zmq.Publisher();
  await publisher.bind('tcp://*:8080');
  console.log('[pub]: bind port 8080');
  while (true) {
    fs.watch(file_name, async () => {
      console.log('[pub]: file changed, sending data...');
      await publisher.send(
        JSON.stringify({
          type: 'changed',
          file: file_name,
          timestamp: Date.now()
        })
      );
      await new Promise((resolve) => {
        setTimeout(resolve, 500);
      });
    });
  }
}

init_publisher();
