import { prisma_client } from "../config/prisma"
import type { PayloadGroupChatInterface, PayloadMessageInterface, PayloadUserInterface, PayloadUserType } from "../types/PayloadTypes"


export const UserQuery = {
    create : async (payload: PayloadUserInterface) => {
        const response = await prisma_client.user.create({
            data: payload
        })
        return response;
    },
    findFirst : async (username : PayloadUserType) => {
        const response = await prisma_client.user.findFirst({
            where: { username : username },
        });
        return response;
    }

}
export const DepartmentQuery = {

}

export const ChannelQuery = {

}

export const GroupQuery = {
    create : async (payload : PayloadGroupChatInterface) => {
        const response = await prisma_client.groupChat.create({
            data: payload
        });
        return response;
    },
    all : async () => await prisma_client.groupChat.findMany(),
    findFirst : async (groupID : string) => await prisma_client.groupChat.findFirst({ where : { id : groupID }})
}

export const MessageQuery = {
    create : async (payload: PayloadMessageInterface) => {
        const response = await prisma_client.message.create({
            data: payload
        })
        return response;
    }
}


