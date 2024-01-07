import * as puppeteer from 'puppeteer';
import cookies from './cookies';
import {
  type ChatListItem,
  LastMsgStatus
} from './types'
if (!cookies?.length) {
  console.error('There is no cookies. you can save a copy with EditThisCookie extension.')
  process.exit(1)
}

const url = `https://www.zhipin.com/web/geek/chat`
const pages = []
globalThis.pages = pages

function sleep(t) {
  return new Promise(resolve => {
    setTimeout(resolve, t)
  })
}

function sleepWithRandomDelay(base) {
  return sleep(base + Math.random() * 1000)
}

; (async () => {
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
    pages.push(page)

    //设置cookie
    for (let i = 0; i < cookies.length; i++) {
      await page.setCookie(cookies[i]);
    }

    await Promise.all([
      page.goto(url, { timeout: 0 }),
      page.waitForNavigation()
    ])

    await sleep(1000)
    await pages[0].evaluate(
      `
        document.querySelector('.main-wrap .chat-user').__vue__.keeps = 100000
      `
    )

    // const chatListScrollContainerProxy = await pages[0].$('.main-wrap .chat-user .chat-content')


    // const possibleScrollRequestPromiseFactory = () => new Promise(resolve => {
    //   const resolveTimer = setTimeout(() => resolve(null), 1500)
    //   page.waitForResponse(
    //     response => {
    //       if (
    //         response.url().startsWith('https://www.zhipin.com/wapi/zpgeek/job/detail.json')
    //       ) {
    //         return true
    //       }
    //       return false
    //     }
    //   ).then(response => {
    //     clearTimeout(resolveTimer)
    //     resolve(response)
    //   })
    // })

    // while (true) {
    //   const chatListScrollContainerProxy = await pages[0].$('.main-wrap .chat-user .chat-content')
    //   // 往下拉新数据
    //   const chatListScrollContainerProxyBBox = (await chatListScrollContainerProxy!.boundingBox())!
    //   await pages[0].mouse.move(
    //     chatListScrollContainerProxyBBox.x + chatListScrollContainerProxyBBox.width / 2,
    //     chatListScrollContainerProxyBBox.y + chatListScrollContainerProxyBBox.height / 2,
    //   )
    //   let scrolledHeight = 0

    //   const targetHeight = 3000
    //   const increase = 40 + Math.floor(30 * Math.random())
    //   while (scrolledHeight < targetHeight) {
    //     scrolledHeight += increase
    //     await pages[0].mouse.wheel({deltaY: increase});
    //     await sleep(1)
    //   }
    // }

    // const chatFunQueue = []

    let retryPollTime = 0
    while (true) {
      let friendListData = await pages[0].evaluate(
        `
          document.querySelector('.main-wrap .chat-user')?.__vue__?.list
        `
      ) as Array<ChatListItem>

      let friendItemElProxyList = await pages[0].$$('.main-wrap .chat-user .user-list-content ul[role=group] li[role=listitem]')
      let readButNoResponseInHalfDayAtIndex = friendListData.findIndex(it => it.lastIsSelf && it.lastMsgStatus === 2 && Number(new Date()) - Number(new Date(it.lastTS)) > 0.5 * 24 * 60 * 60)
      if (readButNoResponseInHalfDayAtIndex < 0) {
        console.warn(`没有职位了，等待第 ${retryPollTime++} 次轮询……`)
        await sleepWithRandomDelay(10000)
        console.log(`开始没有职位后的第 ${retryPollTime} 次轮询……`)

        continue
      } else {
        retryPollTime = 0
      }
      let readButNoResponseInHalf = friendListData[readButNoResponseInHalfDayAtIndex]

      await pages[0].evaluate(
        `
          targetEl = document.querySelector('.main-wrap .chat-user .user-list-content ul[role=group]').children[${readButNoResponseInHalfDayAtIndex}]
          targetEl.scrollIntoView({
            behavior: 'smooth'
          })
          delete targetEl;
        `
      ) as Array<ChatListItem>
      await sleep(200)

      await friendItemElProxyList[readButNoResponseInHalfDayAtIndex].click()
      await page.waitForResponse(
        response => {
          if (
            response.url().startsWith('https://www.zhipin.com/wapi/zpchat/geek/historyMsg')
          ) {
            return true
          }
          return false
        }
      )
      await sleep(500)

      const emotionEntryButtonProxy = await pages[0].$('.chat-conversation .message-controls .btn-emotion')
      await emotionEntryButtonProxy!.click()
      await sleepWithRandomDelay(1000)
      const duckEmotionTabEntryProxy = await pages[0].$('.chat-conversation .message-controls .emotion .emotion-tab .emotion-sort:nth-child(3)')
      await duckEmotionTabEntryProxy!.click()
      await sleepWithRandomDelay(1500)
      const lookForwardReplyEmojiProxy = await pages[0].$(`.chat-conversation .message-controls .emotion .emotion-box img[title=盼回复]`)
      await lookForwardReplyEmojiProxy!.click()


      // const firstListItemIndexInVirtualList = await pages[0].evaluate(
      //   `
      //     document.querySelector('.main-wrap .chat-user .user-list-content .group').firstElementChild.__vue__.index
      //   `
      // ) as number
      // const lastListItemIndexInVirtualList = await pages[0].evaluate(
      //   `
      //     document.querySelector('.main-wrap .chat-user .user-list-content .group').lastElementChild.__vue__.index
      //   `
      // ) as number

      // let scrollDirection = 0
      // if (readButNoResponseInHalfDayAtIndex < firstListItemIndexInVirtualList) {
      //   scrollDirection = 1
      // } else if (readButNoResponseInHalfDayAtIndex > lastListItemIndexInVirtualList) {
      //   scrollDirection = 2
      // } else {
      //   scrollDirection = 0
      // }
      // await pages[0].evaluate(
      //   `
      //     document.querySelector('.main-wrap .chat-user .user-list-content')?.__vue__?.list
      //   `
      // )

      await sleepWithRandomDelay(2000)
      // ;await browser.close()
    }
  } catch (err) {
    console.error(err)
    debugger
  }
})()
