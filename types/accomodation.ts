import { User } from "./user";

export const accomodationTypes = {
    "APARTEMENT":"Appartement",
    "GUEST":"Guest",
    "BUNGALOW":"Bungalow",
    "DORTOIR":"Dortoir"
}

export type Accomodation ={
    id:number;
    type: keyof typeof accomodationTypes;
    name:string;
    address:string;
    rentMin:string;
    rentMax:string;
    area:number;
    receptionCapacity:string;
    media:{
        images:string[]
    },
    owner:User,
    currency:string;
}