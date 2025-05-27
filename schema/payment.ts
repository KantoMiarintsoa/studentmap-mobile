import { z } from "zod";

export const buyCreditSchema = z.object({
    credit: z.number().positive().int()
});

export type BuyCreditSchema = z.infer<typeof buyCreditSchema>;

export const confirmPaymentSchema = z.object({
    credits:z.number().positive().int(),
    paymentMethod:z.string().trim().min(1)
});

export type ConfirmPaymentSchema = z.infer<typeof confirmPaymentSchema>;