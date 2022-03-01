import fs from 'fs';
import { expect } from 'chai';

const rdf = fs.realpathSync(`${__dirname}`);
console.log(rdf);
