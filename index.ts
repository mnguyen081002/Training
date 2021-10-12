import puppeteer from "puppeteer";
import fs from "fs";
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://en.wikipedia.org/wiki/Node.js", {
    waitUntil: "networkidle2",
  });
  const data = await page.$eval("*", (el) => {
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNode(el);
    selection?.removeAllRanges();
    selection?.addRange(range);
    return window.getSelection()?.toString();
  });
  console.log(data);

  fs.writeFileSync("content.txt", data!);
  await browser.close();
})();
