import puppeteer from "puppeteer";
import fs from "fs";
(async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();

  await page.goto("http://clearcalcs.local:5500/internal.html");

  const base64 = await page.screenshot({ encoding: "base64" });
  const buffer = Buffer.from(base64, "base64");
  fs.writeFileSync("screenshot.jpg", buffer);

  console.log("Created jpg screenshot");

  await browser.close();
})();
