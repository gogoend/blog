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
  '青钱',
  '软通动力',
  '南天',
  '睿服',
  '中电金信',
  '佰钧成',
  '云链',
  '博彦',
  '汉克时代',
  '柯莱特',
  '拓保',
  '亿达信息',
  '纬创',
  '微创',
  '微澜',
  '诚迈科技',
  '法本',
  '兆尹',
  '诚迈',
  '联合永道',
  '新致软件',
  '宇信科技'
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
      await sleepWithRandomDelay(3000)
  
      const expectJobList = (await pages[0].evaluate(`
        document.querySelector('.job-recommend-search')?.__vue__?.expectList
      `)
      )
      
      const expectJobTabHandlers = await pages[0].$$('.job-recommend-main .recommend-search-expect .recommend-job-btn')
      expectJobTabHandlers.shift()
  
      // 点击第一个期望职位
      await expectJobTabHandlers[0].click()
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

      const { targetJobElProxy, targetJobIndex } = await new Promise(async (resolve) => {
        // 职位列表
        const recommendJobListElProxy = await pages[0].$('.job-list-container .rec-job-list')

        let jobListData = await pages[0].evaluate(
          `
            document.querySelector('.job-recommend-main')?.__vue__?.jobList
          `
        )
        let targetJobIndex = jobListData.findIndex(it => [...expectCompanySet].find(name => it.brandName.includes(name)))
        while (targetJobIndex < 0) {
          // 往下拉新数据
          const recommendJobListElBBox = await recommendJobListElProxy.boundingBox()
          const windowInnerHeight = await pages[0].evaluate('window.innerHeight')
          await pages[0].mouse.move(
            recommendJobListElBBox.x + recommendJobListElBBox.width / 2,
            windowInnerHeight / 2
          )
          let scrolledHeight = 0
          const targetHeight = 3000
          const increase = 40 + Math.floor(30 * Math.random())
          while (scrolledHeight < targetHeight) {
            scrolledHeight += increase
            await pages[0].mouse.wheel({deltaY: increase});
            await sleep(1)
          }

          await sleep(3000)
          jobListData = await pages[0].evaluate(
            `
              document.querySelector('.job-recommend-main')?.__vue__?.jobList
            `
          )
          targetJobIndex = targetJobIndex = jobListData.findIndex(it => [...expectCompanySet].find(name => it.brandName.includes(name)))
        }

        const recommendJobItemList = await recommendJobListElProxy.$$('ul.rec-job-list > li')
        resolve(
          {
            targetJobElProxy: recommendJobItemList[targetJobIndex],
            targetJobIndex
          }
        )
      })
      if (targetJobIndex > 0) {
        // 把元素滚动到视口内部
        await pages[0].evaluate(`
          const targetEl = document.querySelector("ul.rec-job-list").children[${targetJobIndex}]
          targetEl.scrollIntoView({
            behavior: 'smooth',
            block: ${Math.random() > 0.5 ? '\'center\'' : '\'end\''}
          })
        `)
  
        await sleepWithRandomDelay(200)
  
        // 点击那个元素
        await targetJobElProxy.click()
        await page.waitForResponse(
          response => {
            if (
              response.url().startsWith('https://www.zhipin.com/wapi/zpgeek/job/detail.json')
            ) {
              return true
            }
            return false
          }
        );
        await sleepWithRandomDelay(2000)
      }

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
        try {
          const res = await addFriendResponse.json()
  
          if (res.code !== 0) {
            console.err(res)
            break
          } 
        } catch(err) {
          // console.warn(err)
        } finally {
          await sleepWithRandomDelay(2500)
          if (pages[0].url().startsWith('https://www.zhipin.com/web/geek/chat')) {
            await sleepWithRandomDelay(3000)

            await Promise.all([
              pages[0].waitForNavigation(),
              pages[0].goBack(),
            ])
            await sleepWithRandomDelay(1000)
          }
        }
      } else {
      }
    }

    // ;await browser.close()
  } catch (err) {
    console.error(err)
  }
})()
