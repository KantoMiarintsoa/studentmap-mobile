import { z } from "zod";

export const TypeEnum = z.enum(["APARTEMENT", "GUEST", "BUNGALOW", "DORTOIR"]);

export const addAccomodationSchema = z.object({
    name:z.string(),
    address:z.string(),
    area:z.number(),
    receptionCapacity:z.string(),
    rentMin:z.number(),
    rentMax:z.number(),
    type:TypeEnum,
    city:z.string()
});

export type AddAccomodationSchema = z.infer<typeof addAccomodationSchema>;