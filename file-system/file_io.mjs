import fs from 'fs';
const file_name = 'target.txt';

fs.readFile(file_name, (err, data) => {
  if (err) throw err;
  // Uncaught exceptions escape the event loop
  console.log('readFile: ' + data.toString());
});

fs.writeFile(file_name, 'Data to be written', (err) => {
  if (err) throw err;
  console.log('File written!');
});

const data = fs.readFileSync(file_name);
process.stdout.write('readFileSync: ' + data.toString());
