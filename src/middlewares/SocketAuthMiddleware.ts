import "dotenv/config";
import {  NextFunction } from "express";
import jwt from "jsonwebtoken";
import { Socket } from "socket.io";

declare module 'socket.io' {
    interface Socket {
      user : any;
    }
}

export default function SocketAuthMiddleware(
  socket: Socket,
  next: (err?:Error) => void,
) {
  const token = socket.handshake.auth.token;
    
  if (!token) return next(new Error('Unauthenticated'));

  jwt.verify(
    token as string,
    process.env.ACCESS_TOKEN_SECRET as string,
    (err, user) => {
        console.log(err);
        
      if (err) return next(new Error('Error found while authenticating user.'));
      socket.user = user;
      next();
    },
  );
}
