import puppeteer from "puppeteer";

(async () => {
  let browser = await puppeteer.launch({
    pipe: true,
    dumpio: true,
    headless: "new",
    executablePath: "/usr/bin/chromium",
    timeout: 3000,
    // args: ["--no-sandbox", "--single-process" ]
    args: [
      "--no-sandbox",
      "--autoplay-policy=no-user-gesture-required",
      "--no-first-run",
      "--disable-gpu",
      "--use-fake-ui-for-media-stream",
      "--use-fake-device-for-media-stream",
      "--disable-sync",
      "--single-process",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--no-zygote",
      "--disable-audio-output",
      "--headless",
    ],
  });

  console.log("browser starting");
  const page = await browser.newPage();
  console.log("browser started");
  await page.goto("https://example.com/", { waitUntil: "domcontentloaded" });
  console.log("page connected");

  // Get the "viewport" of the page, as reported by the page.
  const dimensions = await page.evaluate(() => {
    return {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
      deviceScaleFactor: window.devicePixelRatio,
    };
  });

  console.log("Dimensions:", dimensions);
  // await page.screenshot({path: require('path').resolve(__dirname, 'example.png')});
  // console.log('page saved');
  await browser.close();
})();
