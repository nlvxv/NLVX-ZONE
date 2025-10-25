// server/_core/telegram.ts
import { env } from "./env";
import { Telegram } from "telegraf"; // يجب أن تكون هذه التبعية موجودة في package.json

const bot = new Telegram(env.TELEGRAM_BOT_TOKEN);

export async function sendTelegramMessage(message: string) {
  try {
    await bot.sendMessage(env.TELEGRAM_CHAT_ID, message, {
      parse_mode: "HTML",
    });
  } catch (error) {
    console.error("Failed to send Telegram message:", error);
  }
}
