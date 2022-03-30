import dir from 'node-dir';
import parse_rdf from './lib/parse_rdf.mjs';

const directory = process.argv[2];

const options = {
  match: /\.rdf$/,
  exclude: ['pg0.rdf'] // Ignore template (ID == 0)
};

dir.readFiles(directory, options, (err, content, next) => {
  if (err) throw err;
  const parsed_document = parse_rdf(content);
  console.log(JSON.stringify({ index: { _id: `pg${parsed_document.id}` } }));
  console.log(JSON.stringify(parsed_document));
  next();
});

process.stdout.on('error', (err) => {
  if (err.code === 'EPIPE') {
    process.exit();
  }
  throw err;
});
