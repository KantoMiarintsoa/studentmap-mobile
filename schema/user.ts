import { z } from "zod";

export const updateUserSchema = z.object({
    firstName:z.string().optional(),
    lastName:z.string().optional(),
    contact:z.string().optional()
});

export type UpdateUserSchema = z.infer<typeof updateUserSchema>;
