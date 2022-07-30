const puppeteer = require('puppeteer');
const cleanIgnoredElements = require('./clean-ignored-elements')
const cleanDuplicatedSpaces = require('./clean-duplicated-spaces')

const urlList = require('./page-url-list').list

const pages = []
async function processPage(browser, url) {
  let page = await browser.newPage();
  await page.goto(url)
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

  // const promiseFactory = urlList.map(url => {
    // return () => processPage(
    //   browser,
    //   url
    // )
  // })

  let cursor = 0
  const CONCURRENCY = 20
  const originLength = urlList.length

  while(cursor < originLength) {
    cursor += CONCURRENCY
    await Promise.all(
      urlList
      .splice(0, CONCURRENCY)
      .map(
        (url) => processPage(
          browser,
          url
        )
      )
    )
  }

  ;await new Promise(() => {})
  ;await browser.close()
})()
