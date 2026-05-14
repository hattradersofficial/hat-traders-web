const fs = require('fs');
const t = fs.readFileSync('src/lib/data/bluebirdProducts.ts', 'utf8');
const cats = [...t.matchAll(/category: "([^"]+)"/g)].map(m => m[1]);
console.log(Array.from(new Set(cats)));
