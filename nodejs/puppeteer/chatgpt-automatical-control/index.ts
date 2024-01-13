import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth'
import { cookieForChatGpt, chatUiUrl } from './config.ts';
import {
  sleep,
  sleepWithRandomDelay
} from '../_base/utils.mjs'

puppeteer.use(StealthPlugin())

if (!cookieForChatGpt?.length) {
  console.error('There is no cookies. you can save a copy with EditThisCookie extension.')
  process.exit(1)
}
const gptApiUrl = `https://chat.openai.com/backend-api/conversation`
const pages = []
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
      for (let i = 0; i < cookieForChatGpt.length; i++) {
        await page.setCookie(cookieForChatGpt[i]);
      }

      await Promise.all([
        page.goto(chatUiUrl, { timeout: 0 }),
        page.waitForNavigation(),
      ])

      await sleep(3000)
      const promptTextAreaHandler = await page.$('#prompt-textarea')
      await promptTextAreaHandler?.focus()
      await sleep(3000)

      const sentence = ``
      const lines = sentence.split('\n')
      for (let i = 0; i < lines.length; i++) {
        const currentTypingLine = lines[i]
        const sentenceQueue = currentTypingLine.match(/(.{1,3})/gs) ?? []
        while (sentenceQueue.length) {
          const head = sentenceQueue.shift()
          await page.keyboard.type(head ?? '')
          await sleep(100)
        }

        await page.keyboard.down('ShiftRight')
        await page.keyboard.press('Enter')
        await page.keyboard.up('ShiftRight')
        await sleep(50)
      }
      
      await sleep(3000)
      await page.keyboard.press('Enter')
      await page.waitForResponse(
        response => {
          if (
            response.url().startsWith(gptApiUrl)
          ) {
            return true
          }
          return false
        }
      )
      await sleep(2000)

      let innerTextInLatestMessage
      try {
        innerTextInLatestMessage = (await pages[0].evaluate(
          `
          ;(() => {
            const allMsgEls = document.querySelectorAll('div.text-token-text-primary [data-message-author-role]')
            const targetEl = allMsgEls[allMsgEls.length - 1]
            const reactPropKey = Object.keys(targetEl).find(it => it.startsWith('__reactProps'))
            if (
              targetEl[reactPropKey].children[3].props.message.err ||
              targetEl[reactPropKey].children[3].props.message.errCode ||
              targetEl[reactPropKey].children[3].props.message.errType
            ) {
              throw new Error('RESPONSE ERROR')
            }

            const markdownEl = targetEl.querySelector('.markdown')

            return markdownEl.textContent
          })()
        `
        ))
      } catch (err) {
        throw err
      }

      console.log(innerTextInLatestMessage)
      debugger
    } catch (err) {
      console.error(err)
      debugger
    }
  })()
