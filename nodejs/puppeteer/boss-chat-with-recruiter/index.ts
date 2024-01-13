import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth'
import cookies from './cookies.ts';
import {
  type ChatListItem,
  LastMsgStatus
} from './types.ts'
import {
  sleep,
  sleepWithRandomDelay
} from '../_base/utils.mjs'
import { Page } from 'puppeteer';
if (!cookies?.length) {
  console.error('There is no cookies. you can save a copy with EditThisCookie extension.')
  process.exit(1)
}

puppeteer.use(StealthPlugin())

const url = `https://www.zhipin.com/web/geek/chat`
const pages = []

const sendLookForwardReplyEmotion = async (page: Page) => {
  const emotionEntryButtonProxy = await page.$('.chat-conversation .message-controls .btn-emotion')
  await emotionEntryButtonProxy!.click()
  await sleepWithRandomDelay(1000)
  const duckEmotionTabEntryProxy = await page.$('.chat-conversation .message-controls .emotion .emotion-tab .emotion-sort:nth-child(3)')
  await duckEmotionTabEntryProxy!.click()
  await sleepWithRandomDelay(1500)
  const lookForwardReplyEmojiProxy = await page.$(`.chat-conversation .message-controls .emotion .emotion-box img[title=盼回复]`)
  await lookForwardReplyEmojiProxy!.click()
}

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
      let noReadNoReplyBossIdAndLastViewedDateMap = new Map<string, Date>()
      let noExplicitReadBossFlag = false
      const tempBlockBossMap = new Map<string, Date>()
      while (true) {
        let friendListData = await pages[0].evaluate(
          `
          document.querySelector('.main-wrap .chat-user')?.__vue__?.list
        `
        ) as Array<ChatListItem>

        let friendItemElProxyList = await pages[0].$$('.main-wrap .chat-user .user-list-content ul[role=group] li[role=listitem]')

        let oldBossList = friendListData.filter(it => Number(new Date()) - Number(new Date(it.lastTS)) > 0.5 * 24 * 60 * 60 * 1000)
        let readButNoResponseInHalfDayAtIndex = friendListData.findIndex(it => oldBossList.includes(it) && it.lastIsSelf && it.lastMsgStatus === 2)
        if (readButNoResponseInHalfDayAtIndex >= 0) {
          retryPollTime = 0
          noReadNoReplyBossIdAndLastViewedDateMap.clear()
          noExplicitReadBossFlag = false
        } else {
          noExplicitReadBossFlag = true
        }
        if (!noExplicitReadBossFlag) {
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

          await sendLookForwardReplyEmotion(pages[0])

          await sleepWithRandomDelay(2000)
          // ;await browser.close()
        } else {
          console.warn(`已知“已读未回”的Boss已经聊完了，正在查找未知状态的Boss - 状态可能被系统消息打断`)

          let blockMsgTemplateList = [
            `该Boss更换了与您沟通的职位`,
            `您是否接受此工作地点`,
            `您正在与Boss(.*)沟通`,
            `我想要一份您的附件简历，您是否同意`// classify 7 templateId 1 type "resume" style "received"
          ].map(it => new RegExp(it))
          // 正常文本消息 normal classify 1
          let allowMsgTemplateList = [
            'Boss还没查看你的消息', // classify 7 templateId 1 type "text" style "item-center"
            '你与该职位竞争者PK情况', // classify 16 templateId 0 type undefined style "article-center"
            '简历诊断提醒',
            '附件简历还没准备好',
            '开场问题，期待你的回答' // classify 7 templateId 1 type "opener"
          ].map(it => new RegExp(it))
          let bossToCheckAtIndex = friendListData.findIndex(it => !tempBlockBossMap.has(it.encryptBossId) && oldBossList.includes(it) && !it.lastIsSelf && allowMsgTemplateList.some(regExp => regExp.test(it.lastText)))
          if (bossToCheckAtIndex >= 0) {
            await pages[0].evaluate(
              `
              targetEl = document.querySelector('.main-wrap .chat-user .user-list-content ul[role=group]').children[${bossToCheckAtIndex}]
              targetEl.scrollIntoView({
                behavior: 'smooth'
              })
              delete targetEl;
            `
            ) as Array<ChatListItem>
            await sleep(200)
            await friendItemElProxyList[bossToCheckAtIndex].click()
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
            await sleep(2000)

            const messageList = await pages[0].evaluate(
              `
            (() => {
              messageElIds = new Set([...(document.querySelector('.main-wrap .chat-conversation .chat-record .im-list')?.children ?? [])].map(it => it.dataset.mid))
              return [
                ...(document.querySelector('.main-wrap .chat-conversation .chat-record')?.__vue__['records$']?.filter(it => messageElIds.has(String(it.mid)) && it.templateId === 1)
                  ??
                  []
                )
              ]
            })()
            `
            ) as Array<ChatListItem>

            const lastMessage = messageList[messageList.length - 1]
            debugger
            if (lastMessage.isSelf && lastMessage.status === LastMsgStatus.HAS_READ) {
              await sendLookForwardReplyEmotion(pages[0])
            } else {
              tempBlockBossMap.set(
                friendListData[bossToCheckAtIndex].encryptBossId, new Date()
              )
            }
            await sleepWithRandomDelay(500)
          } else {
            console.warn(`没有职位了，等待第 ${retryPollTime} 次轮询……`)
            await sleepWithRandomDelay(10000)
            console.log(`开始没有职位后的第 ${retryPollTime++} 次轮询……`)
          }
        }
      }
    } catch (err) {
      console.error(err)
      debugger
    }
  })()