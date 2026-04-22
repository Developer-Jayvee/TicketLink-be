import { Server } from "http";
import { Server as SocketServer } from "socket.io";
import "dotenv/config";
import { MessageQuery } from "../utils/query_handler";
import SocketAuthMiddleware from "../middlewares/SocketAuthMiddleware";

declare module "socket.io" {
  interface Socket {
    currentChannel: string;
  }
}
export default function socket_server(httpServer: Server) : SocketServer{
  const io = new SocketServer(httpServer, {
    cors: {
      origin: process.env.FRONT_ORIGIN,
      methods: ["GET", "POST"],
      credentials: true,
    },
  });


  io.use(SocketAuthMiddleware)
  return io;
}


