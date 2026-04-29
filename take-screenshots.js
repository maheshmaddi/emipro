const { chromium } = require("playwright");
const path = require("path");

const BASE = "http://localhost:3001";
const shots = [
  { url: "/", name: "home" },
  { url: "/home-loan", name: "home-loan" },
  { url: "/compare", name: "compare" },
  { url: "/prepayment", name: "prepayment" },
  { url: "/afford", name: "afford" },
  { url: "/refinance", name: "refinance" },
  { url: "/foreclosure", name: "foreclosure" },
  { url: "/rate-change", name: "rate-change" },
];

(async () => {
  const browser = await chromium.launch({ args: ["--no-sandbox"] });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });

  const dir = path.join(__dirname, "screenshots");
  const fs = require("fs");
  fs.mkdirSync(dir, { recursive: true });

  for (const shot of shots) {
    console.log(`Capturing ${shot.name}...`);
    const page = await context.newPage();
    await page.goto(`${BASE}${shot.url}`, { waitUntil: "networkidle", timeout: 15000 });
    await page.waitForTimeout(1500); // let animations settle
    await page.screenshot({ path: path.join(dir, `${shot.name}.png`), fullPage: false });
    await page.close();
  }

  // Mobile screenshot of home
  console.log("Capturing mobile home...");
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
  });
  const mPage = await mobileContext.newPage();
  await mPage.goto(BASE, { waitUntil: "networkidle", timeout: 15000 });
  await mPage.waitForTimeout(1500);
  await mPage.screenshot({ path: path.join(dir, "home-mobile.png"), fullPage: false });
  await mPage.close();
  await mobileContext.close();

  await browser.close();
  console.log("Done! Screenshots saved to screenshots/");
})();
