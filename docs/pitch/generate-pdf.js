const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  const filePath = path.resolve(__dirname, 'deck.html');
  await page.goto(`file://${filePath}`, { waitUntil: 'networkidle0', timeout: 30000 });
  await page.pdf({
    path: path.resolve(__dirname, 'SD18-Pitch-Deck.pdf'),
    width: '1280px',
    height: '720px',
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  });
  await browser.close();
  console.log('PDF generated: docs/pitch/SD18-Pitch-Deck.pdf');
})();
