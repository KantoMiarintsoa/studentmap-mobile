export type UserRole = "ADMIN" | "STUDENT" | "OWNER" | "ORGANIZER";

export type User = {
    id:string;
    firstName:string;
    lastName:string;
    email:string;
    role:UserRole;
}

export type Session = {
    access_token:string;
    user:User;
}