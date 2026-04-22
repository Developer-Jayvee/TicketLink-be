import { Server } from "http";
import { Server as SocketServer } from "socket.io";
import "dotenv/config";
import { MessageQuery } from "../utils/query_handler";

declare module "socket.io" {
  interface Socket {
    currentChannel: string;
  }
}
export default function initiateSocket(httpServer: Server) {
  const io = new SocketServer(httpServer, {
    cors: {
      origin: process.env.FRONT_ORIGIN,
      methods: ["GET", "POST"],
      credentials: false,
    },
  });

  io.on("connection", (socket) => {
    console.log("connected");

    socket.on("join-channel", (channel_id) => {
      if (socket.currentChannel) {
        socket.leave(socket.currentChannel);

        console.log("Leaved Channel...");
      }

      socket.join(channel_id);
      socket.currentChannel = channel_id;

      console.log(`User joined ${channel_id}`);
    });

    socket.on("send-message", async (data) => {

      const channel_id = socket.currentChannel;

      socket.to(channel_id).emit("channel-message", {
        message: data.message,
        user: data.user,
      });
      console.log(socket.currentChannel);
      
      await MessageQuery.create({
        message:data.message,
        user_id:data.user.id,
        channel_id:socket.currentChannel
      })

    });
    socket.on("disconnect", () => {
      console.log("Disconnecting socket....");
    });
  });

  return {
    io
  }
}


