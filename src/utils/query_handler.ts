import { prisma_client } from "../config/prisma"
import type { PayloadPostInterface, PayloadUserInterface, PayloadUserType } from "../types/PayloadTypes"


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

export const PostQuery = {
    create : async (payload: PayloadPostInterface) => {
        const response = await prisma_client.post.create({
            data: payload
        })
        return response
    }
}