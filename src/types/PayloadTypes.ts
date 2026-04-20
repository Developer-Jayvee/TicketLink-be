
export type RoleTypes = "BASIC" | "ADMIN";
export interface PayloadUserInterface {
    first_name : string;
    last_name : string;
    age : number;
    role:RoleTypes;
    password : string;
    email : string;
    username: string;
}
export interface PayloadMessageInterface {
    user_id : number;
    message : string;
    conversation_id : number;
    department_id : number | null ;
}

export interface PayloadConversationInterface{
    name : string;
    channel_id : number;
}

export interface PayloadChannelInterface {
    name : string;
    department_id ?: string;
}

export interface PayloadDepartmentInterface {
    name: string;
    description : string;
}
export type PayloadUserType = string;