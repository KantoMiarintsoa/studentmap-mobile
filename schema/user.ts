import { z } from "zod";

export const updateUserSchema = z.object({
    firstName:z.string().optional(),
    lastName:z.string().optional(),
    contact:z.string().optional()
});

export type UpdateUserSchema = z.infer<typeof updateUserSchema>;

export const updatePasswordSchema = z.object({
    oldPassword:z.string({required_error:"Ce champs est requis"}),
    newPassword:z.string({required_error:"Ce champs est requis"}),
    confirm:z.string({required_error:"Ce champs est requis"})
}).refine(data=>data.confirm===data.newPassword, {
    message:"Les mots de passes ne correspondent pas",
    path:["confirm"]
});

export type UpdatePasswordSchema = z.infer<typeof updatePasswordSchema>;