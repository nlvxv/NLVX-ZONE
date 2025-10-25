// server/_core/env.ts
import { z } from "zod";

// تعريف مخطط المتغيرات البيئية المطلوبة
const envSchema = z.object({
  // المتغيرات المطلوبة للتشغيل
  NODE_ENV: z.enum(["development", "production"]).default("development"),
  JWT_SECRET: z.string().min(32), // مطلوب لتشفير الجلسات
  
  // متغيرات التليجرام المطلوبة
  TELEGRAM_BOT_TOKEN: z.string().min(10),
  TELEGRAM_CHAT_ID: z.string().min(5),

  // متغيرات اختيارية (يمكن حذفها إذا لم تكن تستخدمها)
  VITE_APP_TITLE: z.string().optional(),
  VITE_APP_LOGO: z.string().optional(),
  VITE_ANALYTICS_ENDPOINT: z.string().optional(),
  VITE_ANALYTICS_WEBSITE_ID: z.string().optional(),
});

// قراءة المتغيرات والتحقق منها
export const env = envSchema.parse(process.env);
