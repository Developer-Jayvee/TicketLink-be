import initializeSocket from "../utils/socket-handler";
import { pool } from "./db";
import { createServer , Server } from "http";
import socket_server from "./socket_server";

export const initializeServers = async (httpServer : Server , port : number) => {
  try {

    await pool.connect();

    pool.on('connect', () => console.log('DB running...'));
    pool.on('error', () => console.log('DB crash....'));

    await pool.query('SELECT 1');

    
    httpServer.listen(port, () => {
      console.log(`Listening to port ${port}`);
    });
  } catch (error) {
    console.log("Error running servers");
  }
};