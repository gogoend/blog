import { Page } from "puppeteer"
import { sleep } from "../../_base/utils.mjs"

export const mockInputSentence = async (page: Page, sentence: string) => {
  const lines = sentence.split('\n')
  for (let i = 0; i < lines.length; i++) {
    const currentTypingLine = lines[i]
    const sentenceQueue = currentTypingLine.match(/(.{1,3})/gs) ?? []
    while (sentenceQueue.length) {
      const head = sentenceQueue.shift()
      await page.keyboard.type(head ?? '')
      await sleep(10)
    }

    await page.keyboard.down('ShiftRight')
    await page.keyboard.press('Enter')
    await page.keyboard.up('ShiftRight')
    await sleep(50)
  }
}