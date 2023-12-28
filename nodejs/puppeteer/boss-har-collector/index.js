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

function sleep (t) {
  return new Promise(resolve => {
    setTimeout(resolve, t)
  })
}

function sleepWithRandomDelay (base) {
  return sleep(base + Math.random()*1000)
}

;(async () => {
  try {
    const browser = await puppeteer.launch({
      headless: false,
      ignoreHTTPSErrors: true,
      defaultViewport: {
        width: 1440,
        height: 900,
      },
      devtools: true
    })
  
    const page = await browser.newPage()
  
    //设置cookie
    for(let i = 0; i < cookies.length; i++){
      await page.setCookie(cookies[i]);
    }
  
    await page.goto(url, { timeout: 0 })
    pages.push(page)
  
    await new Promise(resolve => setTimeout(resolve, 2500))
    
    const recommendGeekLink = (await pages[0].$('a[ka=menu-geek-recommend]'))
    await recommendGeekLink.click()
    await sleepWithRandomDelay(3000)
  
    const recommendIframeForControl = (await pages[0].frames()).find(it => it._name === 'recommendFrame')
    const jobItemCount = (await recommendIframeForControl.$$(`.ui-dropmenu.job-selecter-wrap .ui-dropmenu-list .job-list .job-item`)).length

    for (let i = 0; i < jobItemCount; i++) {
      const recommendIframe = (await pages[0].$('iframe[name=recommendFrame]'))
      const recommendIframeForControl = (await pages[0].frames()).find(it => it._name === 'recommendFrame')

      if (i > 0) {
        const positionDropdown = await recommendIframeForControl.$(`.ui-dropmenu.job-selecter-wrap .ui-dropmenu-label`)
        positionDropdown.click()
        await sleepWithRandomDelay(500)

        const jobItems = await recommendIframeForControl.$$(`.ui-dropmenu.job-selecter-wrap .ui-dropmenu-list .job-list .job-item`)
        const currentJobItem = jobItems[i]
        currentJobItem.click()
        await sleepWithRandomDelay(3000)
      }
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
  
      const firstGeekCardItemClickArea = await recommendIframeForControl.$(`ul.card-list li.card-item:first-child .card-inner.common-wrap`)
      await sleepWithRandomDelay(1000)
  
      await firstGeekCardItemClickArea.click()

      const geekCardCount = (await recommendIframeForControl.$$(`.candidate-recommend .card-list-wrap .card-list .card-item`)).length
      for (let i = 1; i <= geekCardCount; i++) {
        await sleepWithRandomDelay(1000)
  
        const highlightItems = (await recommendIframeForControl.$$(`.resume-item.item-base .font-hightlight`)) ?? []
        for(let j =0; j < highlightItems.length; j++) {
          if (Math.random() > 0.5) {
            continue
          }
          const it = highlightItems[j]
          await sleepWithRandomDelay(200)
          await it.click()
        }
  
        await sleepWithRandomDelay(2500)
        pages[0].keyboard.press('ArrowRight')
      }
      await sleepWithRandomDelay(1000)
      // 关闭对话框
      const resumeCloseButton = await recommendIframeForControl.$(`.dialog-recommend-resume .resume-custom-close`)
      await resumeCloseButton.click()
      // 收集一次har
      debugger
    }
    // ;await browser.close()
  } catch (err) {
    console.error(err)
    debugger
  }
})()
