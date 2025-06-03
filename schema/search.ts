import { z } from "zod";
import { TypeEnum } from "./accomodation";

export const searchUniversitySchema = z.object({
    type:z.enum(["prive", "public", "all"]).optional(),
    name:z.string().optional(),
    address:z.string().optional()
});

export type SearchUniversitySchema = z.infer<typeof searchUniversitySchema>;

export const searchAccommodationSchema = z.object({
    address:z.string().optional(),
    type:TypeEnum.optional(),
    budget:z.number().optional(),
    nameUniversity:z.string().optional(),
    currency:z.string().default("Ar").optional()
});

export type SearchAccommodationSchema = z.infer<typeof searchAccommodationSchema>;
