import { ENV } from "./env";

export async function sendTelegramMessage(message: string): Promise<boolean> {
  if (!ENV.telegramBotToken || !ENV.telegramChatId) {
    console.warn("[Telegram] Bot token or chat ID not configured");
    return false;
  }

  try {
    const url = `https://api.telegram.org/bot${ENV.telegramBotToken}/sendMessage`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: ENV.telegramChatId,
        text: message,
        parse_mode: "HTML",
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("[Telegram] Failed to send message:", error);
      return false;
    }

    const data = await response.json();
    console.log("[Telegram] Message sent successfully:", data.result.message_id);
    return true;
  } catch (error) {
    console.error("[Telegram] Error sending message:", error);
    return false;
  }
}

export function formatContactMessage(name: string, email: string, message: string): string {
  return `
<b>📧 New Contact Form Submission</b>

<b>Name:</b> ${escapeHtml(name)}
<b>Email:</b> ${escapeHtml(email)}

<b>Message:</b>
${escapeHtml(message)}

<i>Sent at: ${new Date().toLocaleString("en-US", { timeZone: "UTC" })} UTC</i>
  `.trim();
}

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}

