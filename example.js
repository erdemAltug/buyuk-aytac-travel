/**
 * Örnek: Playwright ile bir siteyi 5 saniyede bir yenileme
 * Kullanım: npx playwright run scripts/refresh-every-5s.example.js
 * veya headed mod: npx playwright run scripts/refresh-every-5s.example.js --headed
 */

import { chromium } from 'playwright';

const TARGET_URL = 'https://www.enuygun.com/uyelik/seyahatler'; // İstediğin URL
const REFRESH_INTERVAL_MS = 2000; // 5 saniye

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(TARGET_URL);

  setInterval(async () => {
    await page.reload();
    console.log(`Yenilendi: ${new Date().toISOString()}`);
  }, REFRESH_INTERVAL_MS);

  // Kapatmak için Ctrl+C veya process'i durdur
  console.log(`${REFRESH_INTERVAL_MS / 1000} saniyede bir sayfa yenilenecek. Durdurmak için Ctrl+C.`);
})();