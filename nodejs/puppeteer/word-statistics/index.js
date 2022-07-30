const puppeteer = require('puppeteer');
const cleanIgnoredElements = require('./clean-ignored-elements')
const cleanDuplicatedSpaces = require('./clean-duplicated-spaces')

const pages = []
async function processPage(browser) {
  let page = await browser.newPage();
  await page.goto('http://localhost:8080/docs/manual/en/introduction/Creating-a-scene.html')
  pages.push(page)

  await new Promise(resolve => setTimeout(resolve, 2000))

  // 在浏览器端注入函数 - 使用Function#toString将函数体转换为字符串
  await page.addScriptTag({
    content: `${cleanIgnoredElements}${cleanDuplicatedSpaces}`,
    type: 'application/javascript'
  })

  let a = await page.$eval('body', async (el) => {
    await window.cleanIgnoredElements(el)
    return await window.cleanDuplicatedSpaces(el.innerText)
  })

  console.log(a.split(/\s/).length)
  await page.close()

  let index = pages.findIndex((it) => it === page)
  if (index > -1) {
    pages.splice(index, 1)
  }
}

;(async () => {
  const browser = await puppeteer.launch({ headless: false })

  await processPage(browser)

  ;await new Promise(() => {})
  ;await browser.close()
})()
