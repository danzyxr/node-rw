import fs from 'fs';
import { spawn } from 'child_process';

var timeout;
const file_name = process.argv[2];

if (!file_name) {
  throw new Error('No file found in argv');
}

fs.watch(file_name, (e) => {
  // Arrow fns do not have their own `this`
  // Event (e) sends info as parameter to callback
  if (!timeout) {
    // Create ChildProcess object
    const ls = spawn('ls', ['-lh', file_name]);
    ls.stdout.pipe(process.stdout);

    let output = '';
    // Data events pass a Buffer object
    ls.stdout.on('data', (chunk) => (output += chunk));
    // Implicitly call toString() on output <- chunk
    ls.on('close', () => {
      const parts = output.split(/\s+/);
      console.log([parts[0], parts[4], parts[8]]); // ???
    });

    console.log(`Detected ${e}`);
    console.log(`${file_name} changed!`);
    // Prevent fs.watch printing twice
    timeout = setTimeout(() => {
      timeout = null;
    }, 0);
  }
});

console.log(`Now watching ${file_name} for changes...`);

// What happens if the target file doesn’t exist?
// What happens if a file being watched gets deleted?
// The filename was pulled from process.argv. Consider these questions:
// Instead, how would you take the process to spawn from process.argv?
// How would you pass an arbitrary number of additional parameters from
// process.argv to the spawned process.
// (e.g., node watcher-spawn-cmd.js target.txt ls -l -h )
