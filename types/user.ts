export type UserRole = "ADMIN" | "STUDENT" | "OWNER" | "ORGANIZER";

export type User = {
    id:number;
    firstName:string;
    lastName:string;
    email:string;
    role:UserRole;
    profilePicture?:string;
    contact:string;
    serviceRemainders:number;
}

export type Session = {
    access_token:string;
    user:User;
}

export type PaymentMethod = {
    id:string;
    card:{
        brand:string;
        last4:string;
        exp_month:number;
        exp_year:number;
    }
}