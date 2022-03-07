import fs from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { describe } from 'mocha';
import { expect } from 'chai';
import parse_rdf from '../lib/parse_rdf.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rdf = fs.readFileSync(`${__dirname}/pg132.rdf`);

describe('parse_rdf', () => {
  it('should be a function', () => {
    expect(parse_rdf).to.be.a('function');
  });
  it('should parse rdf content', () => {
    const book = parse_rdf(rdf);
    expect(book).to.be.an('object');
    expect(book).to.have.a.property('id', 132);
    expect(book).to.have.a.property('title', 'The Art of War');
  });
});
