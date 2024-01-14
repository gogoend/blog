import { Page } from "puppeteer"
import { sleep } from "../_base/utils.mjs"
import { chatGptApiUrl } from "./config.ts"
import { mockInputSentence } from "./utils/mockInputSentence.js"

export const gptAsk = async (page: Page, prompt: string): Promise<string> => {
  const promptTextAreaHandler = await page.$('#prompt-textarea')
  await promptTextAreaHandler?.focus()
  await sleep(500)

  await mockInputSentence(page, prompt)
  await sleep(500)
  await page.keyboard.press('Enter')
  await page.waitForResponse(
    response => {
      if (
        response.url().startsWith(chatGptApiUrl)
      ) {
        return true
      }
      return false
    }
  )
  await sleep(1000)

  let res = ''
  let waitTime = 0
  while(true) {
    const current = (await page.evaluate(
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
  
          return markdownEl.innerText
        })()
      `
    )) as string
    if (res !== current) {
      res = current
      waitTime = 0
      await sleep(1000)
    } else {
      if (waitTime < 3) {
        waitTime++
      } else {
        return res
      }
    }
  }
}
