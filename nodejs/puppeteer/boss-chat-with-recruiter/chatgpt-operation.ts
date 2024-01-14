import { Page } from "puppeteer"
import { sleep } from "../_base/utils.mjs"
import { chatGptApiUrl } from "./config.ts"

export const gptAsk = async (page: Page, prompt: string): Promise<string> => {
  await sleep(3000)
  const promptTextAreaHandler = await page.$('#prompt-textarea')
  await promptTextAreaHandler?.focus()
  await sleep(3000)

  const sentence = prompt
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
        response.url().startsWith(chatGptApiUrl)
      ) {
        return true
      }
      return false
    }
  )
  await sleep(2000)

  return (await page.evaluate(
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
  ))
}
