import fs from 'fs';
import path from 'path';

function get_mjs_files(directory) {
  let files_list = [];
  function recurse(dir) {
    fs.readdirSync(dir).forEach((file) => {
      const absolute_path_of_file = path.join(dir, file);
      if (
        dir !== 'data' &&
        dir !== 'node_modules' &&
        fs.statSync(absolute_path_of_file).isDirectory()
      ) {
        // Recursively look through folders
        return recurse(absolute_path_of_file);
      } else if (file.slice(file.length - 4) === '.mjs') {
        return files_list.push(absolute_path_of_file);
      }
    });
  }
  recurse(directory);
  return files_list;
}

const mjs = get_mjs_files('.');

for (const each of mjs) {
  console.log(each);
}
