import { Server } from "http";
import { Server as SocketServer } from "socket.io";
import "dotenv/config";

declare module "socket.io" {
  interface Socket {
    currentRoom: string;
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

    socket.on("join-room", (roomID) => {
      if (socket.currentRoom) {
        socket.leave(socket.currentRoom);
        console.log("Leaved Room...");
      }

      socket.join(roomID);
      socket.currentRoom = roomID;
      console.log(`User joined ${roomID}`);
    });

    socket.on("send-message", (data) => {
      console.log(JSON.stringify(data));

      const roomId = socket.currentRoom;

      socket.to(roomId).emit("room-message", {
        message: data.message,
        user: data.user,
      });
    });
    socket.on("disconnect", () => {
      console.log("Disconnecting socket....");
    });
  });

  return {
    io
  }
}


