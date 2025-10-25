// nlvx-portfolio/server/router/index.ts
import { router } from "../_core/trpc";
import { contactRouter } from "./contact";
// تم حذف: import { authRouter } from "./auth";

export const appRouter = router({
  // تم حذف: auth: authRouter,
  contact: contactRouter,
});

export type AppRouter = typeof appRouter;
