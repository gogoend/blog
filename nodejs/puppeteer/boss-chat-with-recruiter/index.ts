import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth'
import cookies from './cookies.ts';
import {
  type ChatListItem,
  LastMsgStatus
} from './types'
import {
  sleep,
  sleepWithRandomDelay
} from '../_base/utils.mjs'
if (!cookies?.length) {
  console.error('There is no cookies. you can save a copy with EditThisCookie extension.')
  process.exit(1)
}

puppeteer.use(StealthPlugin())

const url = `https://www.zhipin.com/web/geek/chat`
const pages = []
globalThis.pages = pages

; (async () => {
  try {
    const browser = await puppeteer.launch({
      headless: false,
      ignoreHTTPSErrors: true,
      defaultViewport: {
        width: 1440,
        height: 800,
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

    await sleep(2000)

    while (true) {
      const isFinished = await pages[0].evaluate(
        `
        (document.querySelector('.main-wrap .chat-user .user-list-content div[role=tfoot] .finished')?.textContent ?? '').includes('没有')
        `
      )
      if (isFinished) {
        break;
      }
      await pages[0].evaluate(
        `
        targetEl = document.querySelector('.main-wrap .chat-user .user-list-content ul[role=group]').lastElementChild
        targetEl.scrollIntoView({
          behavior: 'smooth'
        })
        `
      )
      await page.waitForRequest(
        request => {
          if (
            request.url().startsWith('https://www.zhipin.com/wapi/zpgeek/job/detail.json')
          ) {
            return true
          }
          return false
        }, {
          timeout: 2000
        }
      ).then(() => {
        return page.waitForResponse(
          response => {
            if (
              response.url().startsWith('https://www.zhipin.com/wapi/zpgeek/job/detail.json')
            ) {
              return true
            }
            return false
          }
        )
      }, (err) => {
        void err
      })

      await sleepWithRandomDelay(2500)
    }

    let retryPollTime = 0
    while (true) {
      let friendListData = await pages[0].evaluate(
        `
          document.querySelector('.main-wrap .chat-user')?.__vue__?.list
        `
      ) as Array<ChatListItem>

      let friendItemElProxyList = await pages[0].$$('.main-wrap .chat-user .user-list-content ul[role=group] li[role=listitem]')
      let readButNoResponseInHalfDayAtIndex = friendListData.findIndex(it => it.lastIsSelf && it.lastMsgStatus === 2 && Number(new Date()) - Number(new Date(it.lastTS)) > 0.75 * 24 * 60 * 60 * 1000)
      if (readButNoResponseInHalfDayAtIndex < 0) {
        console.warn(`没有职位了，等待第 ${retryPollTime} 次轮询……`)
        await sleepWithRandomDelay(10000)
        console.log(`开始没有职位后的第 ${retryPollTime++} 次轮询……`)

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

      await sleepWithRandomDelay(2000)
      // ;await browser.close()
    }
  } catch (err) {
    console.error(err)
    debugger
  }
})()
