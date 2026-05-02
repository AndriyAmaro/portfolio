import { chromium } from 'playwright';

const URL = 'https://portfolio.andrifullstack.workers.dev';
const OUT = 'C:/tmp/portfolio-screenshots';
const WAIT = 3000;

const viewports = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'mobile', width: 390, height: 844 },
];

const sections = [
  { id: 'hero', selector: '#hero, [data-section="hero"], section:first-of-type', scrollTo: 'top' },
  { id: 'about', selector: '#about, [data-section="about"]' },
  { id: 'skills', selector: '#skills, [data-section="skills"]' },
  { id: 'projects', selector: '#projects, [data-section="projects"]' },
  { id: 'code-in-action', selector: '#code-in-action, [data-section="code-in-action"]' },
  { id: 'ecosystem', selector: '#ecosystem, [data-section="ecosystem"]' },
  { id: 'services', selector: '#services, [data-section="services"]' },
  { id: 'contact', selector: '#contact, [data-section="contact"]' },
];

async function run() {
  const browser = await chromium.launch({ headless: true });

  for (const vp of viewports) {
    console.log(`\n=== ${vp.name} (${vp.width}x${vp.height}) ===`);
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: vp.name === 'mobile' ? 2 : 1,
    });
    const page = await context.newPage();

    console.log('Loading page...');
    await page.goto(URL, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(WAIT);

    // Full page screenshot first
    console.log(`Taking full page screenshot...`);
    await page.screenshot({
      path: `${OUT}/${vp.name}-fullpage.png`,
      fullPage: true,
    });

    // Check for horizontal scroll (mobile)
    if (vp.name === 'mobile') {
      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
      if (scrollWidth > clientWidth) {
        console.log(`!! HORIZONTAL SCROLL DETECTED: scrollWidth=${scrollWidth} > clientWidth=${clientWidth}`);
      } else {
        console.log(`OK: No horizontal scroll (scrollWidth=${scrollWidth}, clientWidth=${clientWidth})`);
      }
    }

    // Section screenshots
    for (const section of sections) {
      try {
        if (section.scrollTo === 'top') {
          await page.evaluate(() => window.scrollTo(0, 0));
          await page.waitForTimeout(500);
          await page.screenshot({
            path: `${OUT}/${vp.name}-${section.id}.png`,
            clip: { x: 0, y: 0, width: vp.width, height: vp.height },
          });
          console.log(`OK: ${section.id}`);
          continue;
        }

        // Try each selector
        const selectors = section.selector.split(', ');
        let found = false;
        for (const sel of selectors) {
          const el = await page.$(sel);
          if (el) {
            await el.scrollIntoViewIfNeeded();
            await page.waitForTimeout(800);
            const box = await el.boundingBox();
            if (box) {
              // Take screenshot of the section area
              await page.screenshot({
                path: `${OUT}/${vp.name}-${section.id}.png`,
              });
              console.log(`OK: ${section.id} (${sel}) - y:${Math.round(box.y)}, h:${Math.round(box.height)}`);
              found = true;
              break;
            }
          }
        }
        if (!found) {
          console.log(`MISS: ${section.id} - no matching selector found`);
        }
      } catch (err) {
        console.log(`ERROR: ${section.id} - ${err.message}`);
      }
    }

    await context.close();
  }

  await browser.close();
  console.log('\nDone! Screenshots saved to:', OUT);
}

run().catch(console.error);
