const fs = require('fs');
const path = require('path');

function extractData(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const blocks = content.split(/\{|\}/);
  const products = [];
  blocks.forEach(block => {
    const slugMatch = block.match(/"slug"\s*:\s*"([^"]+)"|'slug'\s*:\s*'([^']+)'|slug\s*:\s*"([^"]+)"|slug\s*:\s*'([^']+)'/);
    const catMatch = block.match(/"category"\s*:\s*"([^"]+)"|'category'\s*:\s*'([^']+)'|category\s*:\s*"([^"]+)"|category\s*:\s*'([^']+)'/);
    if (slugMatch) {
      const slug = slugMatch[1] || slugMatch[2] || slugMatch[3] || slugMatch[4];
      const category = catMatch ? (catMatch[1] || catMatch[2] || catMatch[3] || catMatch[4]) : null;
      products.push({ slug, category });
    }
  });
  return products;
}

const base = "https://hattraders.com";
const now = new Date().toISOString().split('T')[0];

const urls = [
  { url: base, priority: 1.0 },
  { url: `${base}/about`, priority: 0.8 },
  { url: `${base}/contact`, priority: 0.8 },
  { url: `${base}/privacy-policy`, priority: 0.3 },
  { url: `${base}/terms`, priority: 0.3 },
  { url: `${base}/products/decorative-paints`, priority: 0.9 },
  { url: `${base}/products/paint-accessories`, priority: 0.9 },
  { url: `${base}/products/hardware-tools`, priority: 0.9 },
  { url: `${base}/products/sanitary`, priority: 0.9 },
  { url: `${base}/products/bluebird-arts`, priority: 0.9 },
  { url: `${base}/products/decorative-paints/nippon-paints`, priority: 0.8 },
  { url: `${base}/products/decorative-paints/gobis-paints`, priority: 0.8 },
  { url: `${base}/products/decorative-paints/sparco-paints`, priority: 0.8 },
  { url: `${base}/products/decorative-paints/ici-dulux-paints`, priority: 0.8 },
];

const paintSlugs = ["glorex-paints", "spray-paints"];
const accessorySlugs = ["brushes", "rollers", "deco-sets", "scrappers"];
const toolSlugs = ["power-tools", "sandpapers", "hand-tools", "drill-bits", "grinder-discs", "blades"];
const sanitarySlugs = ["faisal", "porta", "sunny", "accufit", "water-tanks"];

paintSlugs.forEach(s => urls.push({ url: `${base}/products/decorative-paints/${s}`, priority: 0.7 }));
accessorySlugs.forEach(s => urls.push({ url: `${base}/products/paint-accessories/${s}`, priority: 0.7 }));
toolSlugs.forEach(s => urls.push({ url: `${base}/products/hardware-tools/${s}`, priority: 0.7 }));
sanitarySlugs.forEach(s => urls.push({ url: `${base}/products/sanitary/${s}`, priority: 0.7 }));

// Parse databases
const nippon = extractData(path.join(__dirname, 'src/lib/data/nipponPaints.ts'));
nippon.forEach(p => urls.push({ url: `${base}/products/decorative-paints/nippon-paints/${p.slug}`, priority: 0.7 }));

const gobis = extractData(path.join(__dirname, 'src/lib/data/gobisPaints.ts'));
gobis.forEach(p => urls.push({ url: `${base}/products/decorative-paints/gobis-paints/${p.slug}`, priority: 0.7 }));

const sparco = extractData(path.join(__dirname, 'src/lib/data/sparcoPaints.ts'));
sparco.forEach(p => urls.push({ url: `${base}/products/decorative-paints/sparco-paints/${p.slug}`, priority: 0.7 }));

const dulux = extractData(path.join(__dirname, 'src/lib/data/duluxPaints.ts'));
dulux.forEach(p => urls.push({ url: `${base}/products/decorative-paints/ici-dulux-paints/${p.slug}`, priority: 0.7 }));

const spray = extractData(path.join(__dirname, 'src/lib/data/sprayPaints.ts'));
spray.forEach(p => urls.push({ url: `${base}/products/decorative-paints/spray-paints/${p.slug}`, priority: 0.7 }));

const bluebird = extractData(path.join(__dirname, 'src/lib/data/bluebirdProducts.ts'));
bluebird.forEach(p => urls.push({ url: `${base}/products/bluebird-arts/${p.slug}`, priority: 0.7 }));

const accufit = extractData(path.join(__dirname, 'src/lib/data/accufitProducts.ts'));
accufit.forEach(p => urls.push({ url: `${base}/products/sanitary/accufit/${p.slug}`, priority: 0.7 }));

const porta = extractData(path.join(__dirname, 'src/lib/data/portaProducts.ts'));
porta.forEach(p => urls.push({ url: `${base}/products/sanitary/porta/${p.slug}`, priority: 0.7 }));

const faisal = extractData(path.join(__dirname, 'src/lib/data/faisalProducts.ts'));
faisal.forEach(p => urls.push({ url: `${base}/products/sanitary/faisal/${p.slug}`, priority: 0.7 }));

const waterTanks = extractData(path.join(__dirname, 'src/lib/data/waterTanks.ts'));
waterTanks.forEach(p => urls.push({ url: `${base}/products/sanitary/water-tanks/${p.slug}`, priority: 0.7 }));

const sunny = extractData(path.join(__dirname, 'src/lib/data/sunnyProducts.ts'));
sunny.forEach(p => urls.push({ url: `${base}/products/sanitary/sunny/${p.slug}`, priority: 0.7 }));

const hardware = extractData(path.join(__dirname, 'src/lib/data/hardwareProducts.ts'));
hardware.forEach(p => urls.push({ url: `${base}/products/hardware-tools/${p.category}/${p.slug}`, priority: 0.7 }));

const accessories = extractData(path.join(__dirname, 'src/lib/data/accessoryProducts.ts'));
accessories.forEach(p => urls.push({ url: `${base}/products/paint-accessories/${p.category}/${p.slug}`, priority: 0.7 }));

// Build XML
let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

urls.forEach(u => {
  xml += '  <url>\n';
  xml += `    <loc>${u.url}</loc>\n`;
  xml += `    <lastmod>${now}</lastmod>\n`;
  xml += '    <changefreq>monthly</changefreq>\n';
  xml += `    <priority>${u.priority.toFixed(1)}</priority>\n`;
  xml += '  </url>\n';
});

xml += '</urlset>\n';

const outPath = path.join(__dirname, 'public/sitemap.xml');
fs.writeFileSync(outPath, xml, 'utf8');
console.log(`Successfully generated public/sitemap.xml with ${urls.length} URLs!`);
