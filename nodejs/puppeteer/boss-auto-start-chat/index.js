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

const expectCompanyList = [
  //
  '抖音', '字节', '字跳', '有竹居', '脸萌', '头条',
  //
  '滴滴',
  //
  '网易',
  //
  '腾讯', '搜狗',
  //
  '京东',
  //
  '百度',
  //
  '度小满',
  //
  '爱奇艺',
  //
  '携程', '趣拿', '去哪儿',
  //
  '集度',
  //
  '理想',
  //
  '顺丰',
  //
  '讯飞',
  //
  '同程', '艺龙',
  //
  '贝壳',
  //
  '金山', '小米',
  // 
  '新浪', '微博',
  //
  '阿里', '蚂蚁', '飞猪', '高德', '乌鸫',
  //
  '美团', '三快',
  //
  '快手',
  //
  '映客',
  //
  '小红书', '行吟',
  //
  '奇虎', '360',
  //
  '亚信',
  //
  '启明星辰',
  //
  '奇安信',
  //
  '汽车之家',
  //
  '车好多', '瓜子',
  //
  '易车',
  //
  '昆仑万维', '闲徕',
  //
  '趣加',
  //
  '完美',
  //
  '马上消费',
  //
  '轻松',
  //
  '水滴',
  //
  '白龙马',
  //
  '58', '车欢欢', '五八', '红布林', '致美',
  //
  '美餐',
  //
  '知乎',
  //
  '易点云',
  //
  '搜狐',
  //
  '用友', '畅捷通',
  //
  '猿辅导', '小猿', '猿力',
]

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
