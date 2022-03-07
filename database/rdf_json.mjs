#!/usr/bin/env node

import { readFileSync } from 'fs';
import parse_rdf from './lib/parse_rdf.mjs';

const rdf = readFileSync(process.argv[2]);
const book = parse_rdf(rdf);
console.log(JSON.stringify(book, null, '  '));
