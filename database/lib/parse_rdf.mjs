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

  book.subjects = $("[rdf\\:resource$='/LCSH']")
    // Subjects are stored in <rdf:Description> <rdf:value>
    // tags, but there are 44 Description tags and 38 value
    // tags. The tags we need are siblings to
    // <rdf:resource>, but only if its URL ends in '/LCSH'
    .parent()
    .find('rdf\\:value')
    .toArray()
    .map((x) => {
      return $(x).text();
    });

  return book;
}
