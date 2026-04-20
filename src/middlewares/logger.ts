import { NextFunction , Request , Response } from "express";


export default function Logger(req : Request , res : Response , next : NextFunction){
    next();
}