
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
    user_id : string;
    message : string;
    channel_id : string;
    conversation_id ?: string ;
    department_id ?: string ;
}

export interface PayloadConversationInterface{
    name : string;
    channel_id : string;
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

export interface PayloadGroupChatInterface {
    name : string;
    description : string;
}