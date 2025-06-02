import { z } from "zod";

export const searchUniversitySchema = z.object({
    type:z.enum(["prive", "public", "all"]).optional(),
    name:z.string().optional(),
    address:z.string().optional()
});

export type SearchUniversitySchema = z.infer<typeof searchUniversitySchema>;
