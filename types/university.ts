export type University = {
    id:number;
    name:string;
    description:string;
    city:string;
    address:string;
    mention:string[];
    type:"public"|"prive";
}