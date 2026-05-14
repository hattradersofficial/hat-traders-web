const fs = require('fs');
const path = require('path');

const srcDir = 'E:\\alwaqas-paint-new';
const destDir = 'e:\\hat-traders\\src\\lib\\data';

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

function processGobis() {
  const data = JSON.parse(fs.readFileSync(path.join(srcDir, 'gobis-products.json'), 'utf8'));
  const products = [];
  
  for (const [category, items] of Object.entries(data)) {
    for (const item of items) {
      products.push({
        slug: item.slug,
        title: `Gobis ${item.name}`,
        image: item.image,
        shortDesc: item.description ? item.description.substring(0, 100) + '...' : `Premium ${item.category} range paint by Gobis.`,
        longDesc: item.description ? item.description : `Buy Gobis ${item.name} at Hat Traders. This premium ${item.category} paint provides excellent coverage and long-lasting durability for your walls.`,
        features: item.features ? item.features : [
          "Excellent coverage",
          "Long-lasting durability",
          "Smooth finish",
          "Easy application"
        ]
      });
    }
  }
  
  const fileContent = `export const gobisProducts = ${JSON.stringify(products, null, 2)};`;
  fs.writeFileSync(path.join(destDir, 'gobisPaints.ts'), fileContent);
  console.log('Gobis processed: ' + products.length + ' products');
}

function processSparco() {
  const data = JSON.parse(fs.readFileSync(path.join(srcDir, 'sparco-products.json'), 'utf8'));
  const products = [];
  
  for (const [category, items] of Object.entries(data)) {
    for (const item of items) {
      products.push({
        slug: item.slug || item.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        title: `Sparco ${item.name}`,
        image: item.image || '',
        shortDesc: item.description ? item.description.substring(0, 100) + '...' : `High-quality ${item.category} paint by Sparco.`,
        longDesc: item.description ? item.description : `Transform your spaces with Sparco ${item.name}. Designed for the ${item.category} series, it ensures an impressive finish.`,
        features: item.features ? item.features : [
          "High-quality formula",
          "Smooth application",
          "Rich color finish",
          "Reliable performance"
        ]
      });
    }
  }
  
  const fileContent = `export const sparcoProducts = ${JSON.stringify(products, null, 2)};`;
  fs.writeFileSync(path.join(destDir, 'sparcoPaints.ts'), fileContent);
  console.log('Sparco processed: ' + products.length + ' products');
}

function processIciDulux() {
  const data = JSON.parse(fs.readFileSync(path.join(srcDir, 'extracted_products.json'), 'utf8'));
  const products = [];
  
  // extracted_products.json might have dulux
  const duluxItems = data.dulux || [];
  
  for (const item of duluxItems) {
    products.push({
      slug: item.slug || item.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      title: item.name,
      image: item.image || item.img || '',
      shortDesc: item.description ? item.description.substring(0, 100) + '...' : `Premium ICI Dulux paint.`,
      longDesc: item.description ? item.description : `Purchase ${item.name} from Hat Traders. This ICI Dulux product guarantees a premium finish.`,
      features: item.features ? item.features : [
        "Premium quality",
        "Excellent durability",
        "Beautiful finish",
        "Industry-leading standards"
      ]
    });
  }
  
  const fileContent = `export const duluxProducts = ${JSON.stringify(products, null, 2)};`;
  fs.writeFileSync(path.join(destDir, 'duluxPaints.ts'), fileContent);
  console.log('Dulux processed: ' + products.length + ' products');
}

processGobis();
processSparco();
processIciDulux();
