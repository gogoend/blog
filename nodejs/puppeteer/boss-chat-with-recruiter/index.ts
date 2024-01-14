import {
  bootstrap,
  launchBoss,
  launchChatGpt
} from './bootstrap.ts'
import {
  type ChatListItem,
  LastMsgStatus
} from './types.ts'
import {
  sleep,
  sleepWithRandomDelay
} from '../_base/utils.mjs'
import { Page } from 'puppeteer';
import { sendLookForwardReplyEmotion } from './boss-operation.ts'
import { gptAsk } from './chatgpt-operation.ts';
import { writeLogLine } from './utils/log.js';

export const pageMapByName: {
  boss?: Page | null
  chatGpt?: Page | null
} = {};

(async () => {
  try {
    const browser = await bootstrap()
    await Promise.all([
      launchChatGpt(browser),
      launchBoss(browser)
    ])

    await sleep(1000)
    pageMapByName.boss!.bringToFront()

    await sleep(1000)
    await pageMapByName.boss!.evaluate(
      `
      document.querySelector('.main-wrap .chat-user').__vue__.keeps = 100000
    `
    )

    await sleep(2000)

    while (true) {
      const isFinished = await pageMapByName.boss!.evaluate(
        `
      (document.querySelector('.main-wrap .chat-user .user-list-content div[role=tfoot] .finished')?.textContent ?? '').includes('没有')
      `
      )
      if (isFinished) {
        break;
      }
      await pageMapByName.boss!.evaluate(
        `
      targetEl = document.querySelector('.main-wrap .chat-user .user-list-content ul[role=group]').lastElementChild
      targetEl.scrollIntoView({
        behavior: 'smooth'
      })
      `
      )
      await pageMapByName.boss!.waitForRequest(
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
        return pageMapByName.boss!.waitForResponse(
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
    const tempBlockBossForNoReadMap = new Map<string, Date>()
    while (true) {
      // 处理可以直接通过聊天列表看出来的已读不回的Boss
      let friendListData = await pageMapByName.boss!.evaluate(
        `
        document.querySelector('.main-wrap .chat-user')?.__vue__?.list
      `
      ) as Array<ChatListItem>

      let friendItemElProxyList = await pageMapByName.boss!.$$('.main-wrap .chat-user .user-list-content ul[role=group] li[role=listitem]')

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

        await pageMapByName.boss!.evaluate(
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
        await pageMapByName.boss!.waitForResponse(
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

        await sendLookForwardReplyEmotion(pageMapByName.boss!)

        await sleepWithRandomDelay(2000)
        // ;await browser.close()
      } else {
        // 处理需要进入消息列表才能了解是不是已读不回的Boss
        console.warn(`消息列表中已知“已读未回”的Boss已经聊完了，正在查找未知状态的Boss - 状态可能被系统消息打断`)

        let blockMsgTemplateList = [
          `该Boss更换了与您沟通的职位`,
          `您是否接受此工作地点`,
          `您正在与Boss(.*)沟通`,
          `我想要一份您的附件简历，您是否同意`// classify 7 templateId 1 type "resume" style "received"
        ].map(it => new RegExp(it))
        // 正常文本消息 classify 1
        // 动画表情 classify 20  templateId 0 type "image"
        let allowMsgTemplateList = [
          'Boss还没查看你的消息', // classify 7 templateId 1 type "text" style "item-center"
          '你与该职位竞争者PK情况', // classify 16 templateId 0 type undefined style "article-center"
          '简历诊断提醒',
          '附件简历还没准备好',
          '开场问题，期待你的回答', // classify 7 templateId 1 type "opener"
        ].map(it => new RegExp(it))

        let revokeMsgTemplate = /撤回了一条消息$/ // 与被撤回的消息的类型有关
        let bossToCheckAtIndex = friendListData.findIndex(it => {
          return !tempBlockBossForNoReadMap.has(it.encryptBossId) && oldBossList.includes(it) && ((!it.lastIsSelf && allowMsgTemplateList.some(regExp => regExp.test(it.lastText))) || revokeMsgTemplate.test(it.lastText))
        })
        if (bossToCheckAtIndex >= 0) {
          await pageMapByName.boss!.evaluate(
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
          await pageMapByName.boss!.waitForResponse(
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

          const messageList = await pageMapByName.boss!.evaluate(
            `
          (() => {
            messageElIds = new Set([...(document.querySelector('.main-wrap .chat-conversation .chat-record .im-list')?.children ?? [])].map(it => it.dataset.mid))
            return [
              ...(document.querySelector('.main-wrap .chat-conversation .chat-record')?.__vue__['records$']?.filter(it => messageElIds.has(String(it.mid)) && it.status!==${LastMsgStatus.HAS_REVOKE} && [
                // 求职者自己发的文本、图片/表情
                it.classify === 1,
                it.classify === 20
              ].includes(true))
                ??
                []
              )
            ]
          })()
          `
          ) as Array<ChatListItem>

          const lastMessage = messageList[messageList.length - 1]
          if (lastMessage.isSelf && lastMessage.status === LastMsgStatus.HAS_READ) {
            debugger
            // await sendLookForwardReplyEmotion(pageMapByName.boss!)
          } else {
            tempBlockBossForNoReadMap.set(
              friendListData[bossToCheckAtIndex].encryptBossId, new Date()
            )
            await writeLogLine('tempBlockBossForNoReadMap', friendListData[bossToCheckAtIndex].encryptBossId)
          }
          await sleepWithRandomDelay(500)
        } else {
          const bossCanChatAtIndex = friendListData.findIndex(it => {
            return !it.lastIsSelf && [...allowMsgTemplateList, ...blockMsgTemplateList].every(regExp => !regExp.test(it.lastText))
          })

          // 处理可以聊天的Boss，用ChatGPT回复
          if (bossCanChatAtIndex >= 0) {
            await sleep(200)
            await friendItemElProxyList[bossCanChatAtIndex].click()
            await pageMapByName.boss!.waitForResponse(
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
  
            const messageList = await pageMapByName.boss!.evaluate(
              `
            (() => {
              messageElIds = new Set([...(document.querySelector('.main-wrap .chat-conversation .chat-record .im-list')?.children ?? [])].map(it => it.dataset.mid))
              return [
                ...(document.querySelector('.main-wrap .chat-conversation .chat-record')?.__vue__['records$']?.filter(it => messageElIds.has(String(it.mid)) && it.status!==${LastMsgStatus.HAS_REVOKE} && [
                  it.classify === 1,
                  it.classify === 20
                ].includes(true))
                  ??
                  []
                )
              ]
            })()
            `
            ) as Array<ChatListItem>
  
            const lastMessage = messageList[messageList.length - 1]
            console.log(lastMessage)
            debugger
            const [
              option,
              reply
            ] = (await gptAsk(
              pageMapByName.chatGpt!,
`这是一个新的求职者与招聘者的对话
他学历是大学本科，在寻找前端开发工程师的全职、长期工作，期望薪资30k
现在正在Boss直聘上和招聘者聊天，他说：“${lastMessage.text}”
如果存在这样一些选项：
A：招聘者邀请求职者发简历
B：招聘者问求职者对职位有没有兴趣，期待求职者回复
C：招聘者在问求职者个人信息、家庭情况
D：招聘者在说与招聘无关的事情
E：招聘者拒绝求职者，拒绝原因是期望薪酬太高
F：招聘者拒绝求职者，拒绝原因是学历问题
G：招聘者拒绝求职者，拒绝原因是岗位停止招聘
H：招聘者拒绝求职者，但拒绝原因不在这些选项中

哪个选项比较符合现在招聘者的态度？
请响应选项对应字母，再空一行，针对招聘着说的话，写一句回复；如果招聘者态度为拒绝且没说明拒绝原因，请确保回复中包含对拒绝原因的提问；务必确保回复诚恳、礼貌、得体，语气接近自然语言，不要让人类认为这是ChatGPT的回复；
响应之前，务必确保格式正确。`
            )).split('\n').filter(Boolean)
            debugger
          } else {
            console.warn(`没有职位了，等待第 ${retryPollTime} 次轮询……`)
            await sleepWithRandomDelay(10000)
            console.log(`开始没有职位后的第 ${retryPollTime++} 次轮询……`)
          }
        }
      }
    }
  } catch (err) {
    console.error(err)
    debugger
  }
})()