const puppeteer = require('puppeteer');
const cookies = require('./cookies')

if (!cookies?.length) {
  console.error('There is no cookies. you can save a copy with EditThisCookie extension.')
  process.exit(1)
}

const asyncPoll = require('tiny-async-pool')

const url = `https://www.zhipin.com/web/geek/job-recommend`
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

const expectCompanySet = new Set([
  //
  '青钱', '软通动力', '南天', '睿服', '中金电信', '佰钧成', '云链', '博彦', '汉克时代', '柯莱特', '拓保',
  '亿达信息', '纬创', '微创', '微澜', '诚迈科技', '法本', '兆尹', '诚迈', '联合永道', '新致软件', '宇信科技'
])

;(async () => {
  try {
    const browser = await puppeteer.launch({
      headless: false,
      ignoreHTTPSErrors: true,
      defaultViewport: {
        width: 1440,
        height: 900 - 140,
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
  
    await sleepWithRandomDelay(2500)
    
    const recommendJobLink = (await pages[0].$('[ka=header-job-recommend]'))
    await recommendJobLink.click()

    while (true) {
      await sleepWithRandomDelay(4000)
  
      const expectJobList = (await pages[0].evaluate(`
        document.querySelector('.job-recommend-search')?.__vue__?.expectList
      `)
      )
      
      const expectJobTabHandlers = await pages[0].$$('.job-recommend-main .recommend-search-expect .recommend-job-btn')
      expectJobTabHandlers.shift()
  
      expectJobTabHandlers[0].click()
      await page.waitForResponse(
        response => {
          if (
            response.url().startsWith('https://www.zhipin.com/wapi/zpgeek/pc/recommend/job/list.json')
          ) {
            return true
          }
          return false
        }
      );
      await sleepWithRandomDelay(2000)
  
      const jobData = await pages[0].evaluate('document.querySelector(".job-detail-box").__vue__.data')
  
      const startChatButtonInnerHTML = await pages[0].evaluate('document.querySelector(".job-detail-box .op-btn.op-btn-chat")?.innerHTML.trim()')
      if (startChatButtonInnerHTML === '立即沟通') {
        const startChatButtonProxy = await pages[0].$('.job-detail-box .op-btn.op-btn-chat')
        await startChatButtonProxy.click()

        const addFriendResponse = await page.waitForResponse(
          response => {
            if (
              response.url().startsWith('https://www.zhipin.com/wapi/zpgeek/friend/add.json') && response.url().includes(`jobId=${jobData.jobInfo.encryptId}`)
            ) {
              return true
            }
            return false
          }
        );

        const res = await addFriendResponse.json()

        if (res.code === 1) {
          if (res) {

          }
          console.log(res)
          break
        } 
        await sleepWithRandomDelay(4000)
        pages[0].goBack()
      } else {
      }
    }

    // ;await browser.close()
  } catch (err) {
    console.error(err)
  }
})()
