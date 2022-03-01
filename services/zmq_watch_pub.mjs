import fs from 'fs';
import zmq from 'zeromq';

const file_name = process.argv[2];

async function init_publisher() {
  const publisher = new zmq.Publisher();
  await publisher.bind('tcp://127.0.0.1:8080');
  console.log('Publisher bound to port 8080');

  // while (true) {
  //   console.log('Sending multipart message...');
  //   await publisher.send(['Science News', 'New Nearby Exoplanet']);
  //   await new Promise((resolve) => setTimeout(resolve, 3000));
  // }

  fs.watch(file_name, async () => {
    console.log('Publisher: file changed, sending data...');
    await publisher.send(
      JSON.stringify({
        type: 'changed',
        file: file_name,
        timestamp: Date.now()
      })
    );
  });
}

init_publisher();
