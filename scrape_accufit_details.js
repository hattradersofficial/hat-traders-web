const puppeteer = require('puppeteer');
const fs = require('fs');

const urls = [
  'https://www.accufit.com.pk/products/jointing-solution',
  'https://www.accufit.com.pk/products/electrical-ducts',
  'https://www.accufit.com.pk/products/garden-pipes',
  'https://www.accufit.com.pk/products/pprc-pipes-and-fittings',
  'https://www.accufit.com.pk/products/upvc-pipes-and-fittings'
];

async function scrapeDetails() {
  const browser = await puppeteer.launch({ headless: 'new' });
  const results = [];

  for (const url of urls) {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });
    
    console.log(`Scraping: ${url}`);
    try {
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const details = await page.evaluate((currentUrl) => {
        // Find title
        let titleEl = document.querySelector('h1, h2, .product-title');
        let title = titleEl ? titleEl.innerText.trim() : '';
        
        // Find all images
        const imgs = Array.from(document.querySelectorAll('img'))
          .map(img => img.src)
          .filter(src => src && src.startsWith('http') && !src.includes('logo') && !src.includes('vite.svg'));

        // Find description
        let descEl = document.querySelector('.product-description, p');
        let description = '';
        if (descEl) {
          description = descEl.innerText.trim();
        } else {
          // fallback search for paragraphs
          const ps = Array.from(document.querySelectorAll('p'));
          description = ps.map(p => p.innerText.trim()).filter(t => t.length > 20).join('\n');
        }

        // Find key features / benefits list
        let features = [];
        const lis = Array.from(document.querySelectorAll('li, .benefit-item, .feature-item'));
        if (lis.length > 0) {
          features = lis.map(li => li.innerText.trim()).filter(t => t.length > 5 && t.length < 150);
        }

        // Clean up features
        features = features.filter((item, index) => features.indexOf(item) === index);

        // fallback if features are scarce
        if (features.length === 0) {
          features = [
            "Premium quality manufactured to international standards.",
            "Long service life and high durability.",
            "Resistant to chemicals, corrosion, and pressure."
          ];
        }

        const slug = currentUrl.split('/').pop();

        return {
          title,
          slug,
          description,
          images: imgs,
          features
        };
      }, url);

      results.push(details);
      console.log(`Successfully scraped ${details.title || details.slug} with ${details.images.length} images.`);
    } catch (err) {
      console.error(`Error scraping ${url}:`, err);
    } finally {
      await page.close();
    }
  }

  await browser.close();

  // Save the results as a clean JS file or print them
  console.log('Scraped Results:', JSON.stringify(results, null, 2));
  fs.writeFileSync('e:/hat-traders/scraped_accufit_data.json', JSON.stringify(results, null, 2));
  console.log('Saved to scraped_accufit_data.json');
}

scrapeDetails().catch(console.error);
