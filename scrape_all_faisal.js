const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const categories = [
  'https://faisalsanitary.com/bathroom-sets/',
  'https://faisalsanitary.com/kitchen/',
  'https://faisalsanitary.com/vanity-bowl-mixer/',
  'https://faisalsanitary.com/bib-cocks/',
  'https://faisalsanitary.com/deluxe-range/',
  'https://faisalsanitary.com/jet-showers/',
  'https://faisalsanitary.com/toilet-hand-showers/',
  'https://faisalsanitary.com/concealed-masjid-mixer/',
  'https://faisalsanitary.com/bathroom-accessories/',
  'https://faisalsanitary.com/flush-tanks/'
];

function generateFeatures(title, categoryName) {
  const cat = (categoryName || '').toLowerCase();
  const t = title.toLowerCase();

  // 1. Durability/Material
  let f1 = "Premium quality solid construction for maximum durability";
  if (t.includes('mixer') || t.includes('cock') || t.includes('shower') || t.includes('tap') || t.includes('faucet')) {
    f1 = "Premium lead-free brass construction for ultimate durability and water safety";
  } else if (t.includes('set') || t.includes('accessory') || t.includes('accessories')) {
    f1 = "High-quality material construction designed to resist corrosion and wear";
  } else if (t.includes('tank') || t.includes('flush')) {
    f1 = "Heavy-duty impact-resistant polymer body for long-term leakage prevention";
  }

  // 2. Finish/Surface
  let f2 = "Stunning, high-quality surface finish that resists scratches and tarnishing";
  if (t.includes('gold') || t.includes('pvd')) {
    f2 = "Brilliant PVD full gold finish resists tarnishing, fingerprints, and wear";
  } else if (t.includes('black') || t.includes('matt')) {
    f2 = "Sleek matte finish prevents water spots, fingerprints, and smudging";
  } else if (t.includes('chrome')) {
    f2 = "Mirror-like chrome plating that remains bright and is easy to wipe clean";
  }

  // 3. Inner Mechanism/Valves
  let f3 = "Engineered with advanced components for smooth, long-term operation";
  if (t.includes('mixer') || t.includes('cock') || t.includes('tap') || t.includes('faucet')) {
    f3 = "High-performance ceramic disc cartridge ensures lifetime drip-free usage";
  } else if (t.includes('tank') || t.includes('flush')) {
    f3 = "Precision-engineered flushing valve mechanism for quick and silent refills";
  } else if (t.includes('shower')) {
    f3 = "Self-cleaning silicone nozzle inlets prevent lime scale and mineral buildup";
  }

  // 4. Ergonomics/Control
  let f4 = "Ergonomic design optimized for daily comfort and user-friendly experience";
  if (t.includes('single lever') || t.includes('single-lever') || t.includes('mixer')) {
    f4 = "Single-lever handle design provides effortless water flow and temperature mixing";
  } else if (t.includes('shower') || t.includes('hand shower') || t.includes('jet')) {
    f4 = "Ergonomic trigger or handle grip allows comfortable, fatigue-free handling";
  } else if (t.includes('cock') || t.includes('bib')) {
    f4 = "Quarter-turn ceramic handle enables fast, effortless on/off water control";
  }

  // 5. Flow/Efficiency
  let f5 = "Water-efficient design preserves pressure while reducing usage";
  if (t.includes('mixer') || t.includes('faucet') || t.includes('cock') || t.includes('tap')) {
    f5 = "Integrated water-saving aerator delivers a soft, splash-free aerated stream";
  } else if (t.includes('tank') || t.includes('flush')) {
    f5 = "Dual-flush capability optimizes water volume usage for eco-friendly operation";
  } else if (t.includes('shower')) {
    f5 = "High-pressure spray nozzle pattern maximizes cleaning coverage and force";
  }

  // 6. Installation/Compatibility
  let f6 = "Standard sizes and connections ensure quick, hassle-free installation";
  if (t.includes('concealed') || t.includes('in-wall')) {
    f6 = "Concealed mounting design hiding pipe connections for a clean modern look";
  } else if (t.includes('sink') || t.includes('kitchen') || t.includes('vanity')) {
    f6 = "Includes standard G 1/2 connection hoses and deck-mounting hardware pack";
  } else if (t.includes('shower') || t.includes('jet')) {
    f6 = "Includes durable flexible hose and wall-mount bracket holder for instant setup";
  }

  return [f1, f2, f3, f4, f5, f6];
}

async function scrapeAllFaisal() {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  page.setDefaultNavigationTimeout(0); // Disable timeout

  const allProductLinks = [];

  for (const catUrl of categories) {
    console.log(`Processing category: ${catUrl}`);
    try {
      await page.goto(catUrl, { waitUntil: 'networkidle2', timeout: 60000 });
      
      let hasNextPage = true;
      let currentPage = 1;
      
      while (hasNextPage) {
        console.log(`Extracting links from page ${currentPage} of ${catUrl}...`);
        
        const links = await page.evaluate(() => {
          const anchors = Array.from(document.querySelectorAll('a'));
          return anchors
            .map(a => a.href)
            .filter(href => href && href.includes('/product/') && !href.includes('/product-category/'));
        });
        
        const uniqueLinks = [...new Set(links)];
        allProductLinks.push(...uniqueLinks);
        console.log(`Found ${uniqueLinks.length} product links on page ${currentPage}. Total so far: ${allProductLinks.length}`);
        
        // Check for pagination
        const nextBtn = await page.$('a.next.page-numbers, .next.page-numbers, .woocommerce-pagination a.next');
        if (nextBtn && currentPage < 5) { // safety limit to prevent infinite loops
          currentPage++;
          console.log(`Going to page ${currentPage}...`);
          await Promise.all([
            page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 60000 }),
            nextBtn.click()
          ]);
        } else {
          hasNextPage = false;
        }
      }
    } catch (e) {
      console.error(`Error processing category ${catUrl}:`, e.message);
    }
  }

  // Close the initial page
  await page.close();

  const uniqueProductLinks = [...new Set(allProductLinks)];
  console.log(`Total unique product URLs discovered: ${uniqueProductLinks.length}`);

  const products = [];
  const concurrency = 4;
  const linksToScrape = uniqueProductLinks;
  console.log(`Scraping details for ${linksToScrape.length} products with worker pool of ${concurrency}...`);

  // Pre-allocate pages to reuse
  const pages = [];
  for (let i = 0; i < concurrency; i++) {
    const p = await browser.newPage();
    await p.setViewport({ width: 1280, height: 800 });
    pages.push(p);
  }

  const queue = [...linksToScrape];
  let index = 0;

  const workers = pages.map(async (pageInstance, workerId) => {
    while (queue.length > 0) {
      const link = queue.shift();
      if (!link) break;
      const currentIndex = index++;
      console.log(`Worker ${workerId} scraping [${currentIndex+1}/${linksToScrape.length}]: ${link}`);
      try {
        await pageInstance.goto(link, { waitUntil: 'domcontentloaded', timeout: 60000 });
        
        const productData = await pageInstance.evaluate(() => {
          const titleEl = document.querySelector('h1.product_title, .product_title');
          const title = titleEl ? titleEl.innerText.trim() : '';
          
          const imgEl = document.querySelector('.woocommerce-product-gallery__image img.wp-post-image') || document.querySelector('.product-thumb img') || document.querySelector('.elementor-widget-image img');
          const image = imgEl ? (imgEl.src || imgEl.getAttribute('data-src')) : '';
          
          const descEl = document.querySelector('.woocommerce-product-details__short-description, #tab-description, .product-short-description, .entry-summary .description');
          let description = descEl ? descEl.innerText.trim() : '';
          if (description.length > 200) {
            description = description.substring(0, 200) + '...';
          }
          
          const breadcrumbs = Array.from(document.querySelectorAll('.woocommerce-breadcrumb a, .breadcrumb a'));
          const categoryName = breadcrumbs.length > 1 ? breadcrumbs[breadcrumbs.length - 1].innerText : '';
          
          return { title, image, description, categoryName };
        });
        
        if (productData.title) {
          const slug = link.split('/').filter(Boolean).pop();
          const features = generateFeatures(productData.title, productData.categoryName);
          
          products.push({
            slug: slug,
            title: productData.title,
            image: productData.image,
            shortDesc: productData.description || `Premium product from Faisal Sanitary.`,
            longDesc: productData.description || `This is a high quality product from Faisal Sanitary. Built for durability and style.`,
            productDetailPage: `/products/sanitary/faisal/${slug}`,
            features: features
          });
        }
      } catch (e) {
        console.error(`Error scraping ${link} on worker ${workerId}:`, e.message);
      }
    }
    // Clean up worker page
    await pageInstance.close();
  });

  await Promise.all(workers);

  console.log(`Successfully scraped ${products.length} products.`);

  const fileContent = `export const faisalProducts = ${JSON.stringify(products, null, 2)};`;
  const destFile = path.join(__dirname, 'src/lib/data/faisalProducts.ts');
  fs.writeFileSync(destFile, fileContent, 'utf8');
  console.log(`Saved ${products.length} products to ${destFile}`);

  await browser.close();
}

scrapeAllFaisal().catch(console.error);
