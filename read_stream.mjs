import fs from 'fs';

fs.createReadStream(process.argv[2])
  .on('data', (chunk) => process.stdout.write(chunk))
  .on('error', (err) => process.stderr.write(err.message));

// node read_stream.mjs target.txt
