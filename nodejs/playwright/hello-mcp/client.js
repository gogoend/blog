// client.js
import { MCPClient } from "@modelcontextprotocol/sdk"; // 需要额外装 sdk: npm install @modelcontextprotocol/sdk
import net from "net";

async function main() {
  // 连接到 Provider
  const socket = net.connect("/tmp/mcp.sock"); // 假设 Provider 使用 Unix socket

  const client = new MCPClient({
    name: "test-client",
    transport: { reader: socket, writer: socket },
  });

  await client.start();

  console.log("✅ 已连接到 Playwright MCP Provider");

  // 示例 1：打开页面
  let res = await client.callTool("page.goto", { url: "https://example.com" });
  console.log("page.goto =>", res);

  // 示例 2：点击链接
  res = await client.callTool("page.click", { selector: "text=More information" });
  console.log("page.click =>", res);

  // 示例 3：截图
  res = await client.callTool("page.screenshot", { path: "screenshot.png" });
  console.log("page.screenshot =>", res);
}

main().catch(console.error);