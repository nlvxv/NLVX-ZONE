import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { createContactMessage, getContactMessages } from "./db";
import { notifyOwner } from "./_core/notification";
import { sendTelegramMessage, formatContactMessage } from "./_core/telegram";

export const appRouter = router({
  system: systemRouter,

  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  contact: router({
    submit: publicProcedure
      .input(
        z.object({
          name: z.string().min(1, "Name is required").max(255),
          email: z.string().email("Invalid email"),
          message: z.string().min(1, "Message is required").max(5000),
        })
      )
      .mutation(async ({ input }) => {
        try {
          const result = await createContactMessage({
            name: input.name,
            email: input.email,
            message: input.message,
            status: "new",
          });

          // Send notification to owner
          await notifyOwner({
            title: "New Contact Form Submission",
            content: `From: ${input.name} (${input.email})\n\nMessage: ${input.message}`,
          });

          // Send message to Telegram
          const telegramMessage = formatContactMessage(input.name, input.email, input.message);
          await sendTelegramMessage(telegramMessage);

          return {
            success: true,
            message: "Your message has been sent successfully!",
          };
        } catch (error) {
          console.error("Failed to submit contact message:", error);
          throw new Error("Failed to submit message. Please try again.");
        }
      }),

    list: publicProcedure.query(async () => {
      try {
        const messages = await getContactMessages();
        return messages;
      } catch (error) {
        console.error("Failed to fetch messages:", error);
        return [];
      }
    }),
  }),
});

export type AppRouter = typeof appRouter;
