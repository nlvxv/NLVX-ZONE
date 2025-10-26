// import { COOKIE_NAME } from "@shared/const"; // Not needed
// import { getSessionCookieOptions } from "./_core/cookies"; // Not needed
// import { systemRouter } from "./_core/systemRouter"; // Not needed
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
// import { createContactMessage, getContactMessages } from "./db"; // Not needed
// import { notifyOwner } from "./_core/notification"; // Not needed
import { sendTelegramMessage, formatContactMessage } from "./_core/telegram";

export const appRouter = router({




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
// Removed database insertion

// Removed Manus Notification

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

// Removed message list endpoint
  }),
});

export type AppRouter = typeof appRouter;
