const puppeteer = require('puppeteer');
const cleanIgnoredElements = require('./clean-ignored-elements')
const cleanDuplicatedSpaces = require('./clean-duplicated-spaces')

const urlList = require('./page-url-list').list
const PromisePoll = require('./promise-pool')

const pages = []
const charCountInPages = []
async function processPage(browser, url) {
  let page = await browser.newPage()
  await page.goto(url)
  pages.push(page)

  await new Promise(resolve => setTimeout(resolve, 2500))

  // 在浏览器端注入函数 - 使用Function#toString将函数体转换为字符串
  await page.addScriptTag({
    content: `${cleanIgnoredElements}${cleanDuplicatedSpaces}`,
    type: 'application/javascript'
  })

  let a = await page.$eval('body', async (el) => {
    await window.cleanIgnoredElements(el)
    return await window.cleanDuplicatedSpaces(el.innerText)
  })

  const currentPageCount = {
    url,
    count: a.split(/\s/).length
  }
  console.log(currentPageCount)
  charCountInPages.push(
    currentPageCount
  )
  await page.close()

  let index = pages.findIndex((it) => it === page)
  if (index > -1) {
    pages.splice(index, 1)
  }
}

;(async () => {
  const browser = await puppeteer.launch()

  const promiseFactories = urlList.map(url => {
    return () => processPage(
      browser,
      url
    )
  })

  const CONCURRENCY = 30

  const promisePool = new PromisePoll(
    promiseFactories,
    CONCURRENCY
  )

  const results = await promisePool

  console.log(
    JSON.stringify(charCountInPages)
  )

  ;await new Promise(() => {})
  ;await browser.close()
})()
