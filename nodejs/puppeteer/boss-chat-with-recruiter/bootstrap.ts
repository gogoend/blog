import { Browser } from 'puppeteer';
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth'
import { bossChatUiUrl, chatGptUiUrl, cookieForBoss, cookieForChatGpt } from './config.ts';
import { pageMapByName } from './index.ts';

if ([
  cookieForBoss,
  cookieForChatGpt
].some(it => !it.length)) {
  console.error('请使用EditThisCookie扩展程序获取Cookie并写入config')
  process.exit(1)
}
puppeteer.use(StealthPlugin())

export async function bootstrap() {
  const browser = await puppeteer.launch({
    headless: false,
    ignoreHTTPSErrors: true,
    defaultViewport: {
      width: 1440,
      height: 800,
    },
    devtools: true
  })

  return browser
}

export async function launchChatGpt(browser: Browser) {
  const page = await browser.newPage()
  //设置cookie
  for (let i = 0; i < cookieForChatGpt.length; i++) {
    await page.setCookie(cookieForChatGpt[i]);
  }

  await Promise.all([
    page.goto(chatGptUiUrl, { timeout: 0 }),
    page.waitForNavigation(),
  ])

  pageMapByName['chatGpt'] = page
  page.once(
    'close',
    () => pageMapByName['chatGpt'] = null
  )

  return page
}

export async function launchBoss(browser: Browser) {
  const page = await browser.newPage()
  //设置cookie
  for (let i = 0; i < cookieForBoss.length; i++) {
    await page.setCookie(cookieForBoss[i]);
  }

  await Promise.all([
    page.goto(bossChatUiUrl, { timeout: 0 }),
    page.waitForNavigation(),
  ])

  pageMapByName['boss'] = page
  page.once(
    'close',
    () => pageMapByName['boss'] = null
  )

  return page
}