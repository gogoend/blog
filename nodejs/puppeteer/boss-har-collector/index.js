const puppeteer = require('puppeteer');
const cookies = require('./cookies')
if (!cookies?.length) {
  console.error('There is no cookies. you can save a copy with EditThisCookie extension.')
  process.exit(1)
}

const asyncPoll = require('tiny-async-pool')

const url = `https://www.zhipin.com/web/chat/index`
const pages = []
globalThis.pages = pages
async function processPage(browser, url) {
  let page = await browser.newPage()

  //设置cookie
  for(let i = 0; i < cookies.length; i++){
    await page.setCookie(cookies[i]);
  }

  await page.goto(url, { timeout: 0 })
  pages.push(page)

  await new Promise(resolve => setTimeout(resolve, 2500))
}

function sleep (t) {
  return new Promise(resolve => {
    setTimeout(resolve, t)
  })
}

function sleepWithRandomDelay (base) {
  return sleep(base + Math.random()*1000)
}

;(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    ignoreHTTPSErrors: true,
    defaultViewport: {
      width: 1440,
      height: 900,
    },
    devtools: true
  })

  ;await processPage(browser, url)

  const recommendGeekLink = (await pages[0].$('a[ka=menu-geek-recommend]'))
  await recommendGeekLink.click()
  await sleepWithRandomDelay(3000)

  const recommendIframe = (await pages[0].$('iframe[name=recommendFrame]'))
  const recommendIframeBBox = await recommendIframe.boundingBox()
  await pages[0].mouse.move(
    recommendIframeBBox.x + recommendIframeBBox.width / 2,
    recommendIframeBBox.y + recommendIframeBBox.height / 2
  )

  await pages[0].mouse.wheel({deltaY: 2000});
  await sleepWithRandomDelay(1000)
  await pages[0].mouse.wheel({deltaY: 2000});
  await sleepWithRandomDelay(1000)
  await pages[0].mouse.wheel({deltaY: 2000});
  await sleepWithRandomDelay(1000)
  await pages[0].mouse.wheel({deltaY: 2000});
  await sleepWithRandomDelay(1000)
  await pages[0].mouse.wheel({deltaY: 2000});
  await sleepWithRandomDelay(1000)
  await pages[0].mouse.wheel({deltaY: -10000});

  const recommendIframeForControl = (await pages[0].frames()).find(it => it._name === 'recommendFrame')
  const firstGeekCardItemClickArea = await recommendIframeForControl.$(`ul.card-list li.card-item:first-child .card-inner.common-wrap`)
  await sleepWithRandomDelay(1000)

  await firstGeekCardItemClickArea.click()
  for (let i = 1; i < 45; i++) {
    await sleepWithRandomDelay(1000)

    const highlightItems = (await recommendIframeForControl.$$(`.resume-item.item-base .font-hightlight`)) ?? []
    for(let j =0; j < highlightItems.length; j++) {
      if (Math.random() > 0.5) {
        continue
      }
      const it = highlightItems[j]
      await sleepWithRandomDelay(400)
      await it.click()
    }

    await sleepWithRandomDelay(2500)
    pages[0].keyboard.press('ArrowRight')
  }
  // ;await browser.close()
})()
