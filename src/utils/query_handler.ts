import { prisma_client } from "../config/prisma"
import type { PayloadMessageInterface, PayloadUserInterface, PayloadUserType } from "../types/PayloadTypes"


export const UserQuery = {
    create : async (payload: PayloadUserInterface) => {
        const response = await prisma_client.user.create({
            data: payload
        })
        return response;
    },
    findFirst : async (username : PayloadUserType) => {
        const response = await prisma_client.user.findFirst({
            where: { email : username },
        });
        return response;
    }

}
export const DepartmentQuery = {

}

export const ChannelQuery = {

}


export const MessageQuery = {
    create : async (payload: PayloadMessageInterface) => {
        const response = await prisma_client.message.create({
            data: payload
        })
        return response;
    }
}


