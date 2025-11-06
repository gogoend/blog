// playwright-mcp.js
import { chromium } from "playwright";
import { createPlaywrightProvider } from "@playwright/mcp";

async function main() {
  // 启动浏览器
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  // 创建 MCP Provider，把 Page 暴露出去
  const provider = await createPlaywrightProvider(page);

  console.log("✅ Playwright MCP Provider 已启动，等待模型调用...");
  provider.start();
}

main().catch(console.error);