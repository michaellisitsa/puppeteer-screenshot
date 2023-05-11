import puppeteer from "puppeteer";
import fs from "fs";
(async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();

  await page.goto("http://clearcalcs.local:5500/internal2.html");

  const data = {
    method: "render",
    type: "result",
    value: {
      a: 100 * Math.random(),
      b: 3,
      color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
    },
  };
  // Post a message with the relevant details
  // https://www.appsloveworld.com/nodejs/100/656/sending-a-postmessage-in-puppeteer-nodejs-library
  await page.evaluate((data) => {
    window.postMessage(JSON.stringify(data), "*");
  }, data);

  // https://dev.to/dnature/convert-a-base64-data-into-an-image-in-node-js-3f88
  const base64 = await page.screenshot({ encoding: "base64" });
  const buffer = Buffer.from(base64, "base64");
  fs.writeFileSync("screenshot.jpg", buffer);

  console.log("Created jpg screenshot");

  await browser.close();
})();
