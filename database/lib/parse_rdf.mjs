import * as cheerio from 'cheerio';

export default function parse_rdf(rdf) {
  const $ = cheerio.load(rdf);
  const book = {};
  book.id = +$('pgterms\\:ebook').attr('rdf:about').replace('ebooks/', '');
  book.title = $('dcterms\\:title').text();
  book.authors = $('pgterms\\:agent pgterms\\:name')
    .toArray()
    .map((x) => {
      return $(x).text();
    });
  return book;
}
