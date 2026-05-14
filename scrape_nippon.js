const https = require('https');

https.get('https://alwaqaspaint.com/nippon-paint', (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
        const products = [];
        // Extract basic product details using regex since we don't have cheerio easily available here
        // But wait, cheerio might be installed in a standard next.js environment or we can just install it in a temp dir.
        // Let's just use regex for now or run npm install cheerio in a temp folder.
        const regex = /<a[^>]*href="([^"]+)"[^>]*>.*?<img[^>]*src="([^"]+)"[^>]*>.*?<h3[^>]*>(.*?)<\/h3>/gis;
        let match;
        while ((match = regex.exec(data)) !== null) {
            products.push({
                url: match[1],
                image: match[2],
                title: match[3].trim()
            });
        }
        console.log(JSON.stringify(products.slice(0, 10), null, 2));
    });
}).on('error', err => {
    console.error(err);
});
