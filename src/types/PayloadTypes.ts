
export type RoleTypes = "BASIC" | "ADMIN";
export interface PayloadUserInterface {
    name : string;
    age : number;
    role:RoleTypes;
    password : string;
    email : string;
}

export interface PayloadPostInterface {
    title : string;
    rating : number;
    userId : number;
    favId ?: number;
}
export type PayloadUserType = string;