const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('porta_test.html', 'utf8');
const $ = cheerio.load(html);

console.log('Links containing product:', $('a[href*=\"product\"]').length);
$('a[href*=\"product\"]').slice(0, 10).each((i, el) => console.log($(el).attr('href')));

// Also print the classes of elements that seem to be products or grid items.
console.log('--- classes ---');
const classes = new Set();
$('[class*=\"product\"]').slice(0, 20).each((i, el) => classes.add($(el).attr('class')));
console.log(Array.from(classes));

