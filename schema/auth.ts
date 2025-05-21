import { z } from "zod";

export const loginSchema = z.object({
    email:z.string().trim().email(),
    password:z.string().min(6)
});

export type LoginSchema = z.infer<typeof loginSchema>;

const RoleEnum  = z.enum(["STUDENT", "OWNER"]);

export const registerSchema = z.object({
    firstName:z.string(),
    lastName:z.string(),
    email:z.string().trim().email(),
    password:z.string().min(6),
    confirmPassword:z.string().min(6),
    contact:z.string(),
    role: RoleEnum
}).refine(data=>data.confirmPassword===data.password, {
    message:"password don't match",
    path:["confirmPassword"]
});

export type RegisterSchema = z.infer<typeof registerSchema>;