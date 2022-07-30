const puppeteer = require('puppeteer');
const cleanIgnoredElements = require('./clean-ignored-elements')
const cleanDuplicatedSpaces = require('./clean-duplicated-spaces')

const pages = []
async function processPage(page) {
  pages.push(page)
  await page.goto('http://localhost:8080/docs/manual/en/introduction/Creating-a-scene.html')
  await new Promise(resolve => setTimeout(resolve, 2000))

  // 在浏览器端注入函数 - 使用Function#toString将函数体转换为字符串
  await page.addScriptTag({
    content: `${cleanIgnoredElements}${cleanDuplicatedSpaces}`,
    type: 'application/javascript'
  })

  let a = await page.$eval('body', async (el) => {
    await window.cleanIgnoredElements(el)

    debugger
    return await window.cleanDuplicatedSpaces(el.innerText)
  })

  console.log(a.split(/\s/).length)
}

;(async () => {
  const browser = await puppeteer.launch({ headless: false })

  let page = await browser.newPage();

  await processPage(page)

  ;await new Promise(() => {})
  ;await browser.close()
})()
