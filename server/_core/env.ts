export const ENV = {





  isProduction: process.env.NODE_ENV === "production",


  telegramBotToken: process.env.TELEGRAM_BOT_TOKEN ?? "",
  telegramChatId: process.env.TELEGRAM_CHAT_ID ?? "",
};
