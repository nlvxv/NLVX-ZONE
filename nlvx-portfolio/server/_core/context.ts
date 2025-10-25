import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";

// تعريف نوع السياق (Context Type) بدون الحاجة إلى User أو Drizzle
export type TrpcContext = {
  req: CreateExpressContextOptions["req"];
  res: CreateExpressContextOptions["res"];
  // يمكننا إزالة 'user' لأنه لم يعد هناك مصادقة
};

// دالة إنشاء السياق (Context)
export async function createContext(
  opts: CreateExpressContextOptions
): Promise<TrpcContext> {
  // لا يوجد مصادقة، لذا لا نحتاج إلى كود sdk.authenticateRequest
  
  return {
    req: opts.req,
    res: opts.res,
    // user: null, // لم يعد ضرورياً
  };
}
