// server/_core/context.ts
import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";

export type TrpcContext = {
  req: CreateExpressContextOptions["req"];
  res: CreateExpressContextOptions["res"];
};

export async function createContext(
  opts: CreateExpressContextOptions
): Promise<TrpcContext> {
  // لا يوجد مصادقة أو قاعدة بيانات، لذا لا نحتاج لأي كود هنا
  return {
    req: opts.req,
    res: opts.res,
  };
}
