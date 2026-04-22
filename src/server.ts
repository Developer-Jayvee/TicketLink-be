import "dotenv/config";
import express from "express";
import { createServer } from "http";
import { pool } from "./config/db";
import socket_server from "./config/socket_server";
import initializeSocket from "./utils/socket-handler";

const app = express();
const httpServer = createServer(app);

const port = process.env.PORT || 8002;

app.use(express.json());

const initializeServers = async () => {
  try {

    await pool.connect();

    pool.on('connect', () => console.log('DB running...'));
    pool.on('error', () => console.log('DB crash....'));

    await pool.query('SELECT 1');

    const io = socket_server(httpServer)
    initializeSocket(io);
    httpServer.listen(port, () => {
      console.log(`Listening to port ${port}`);
    });
  } catch (error) {
    console.log("Error running servers");
  }
};


initializeServers();
