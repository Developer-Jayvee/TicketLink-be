import "dotenv/config";
import express from "express";
import { createServer } from "http";
import GroupRoutes from './routes/securedRoutes';
import { cors_config } from "./config/cors";
import { initializeServers } from "./config/servers";
import socket_server from "./config/socket_server";
import initializeSocket from "./utils/socket-handler";

const app = express();
const httpServer = createServer(app);

const port = Number(process.env.PORT) || 8002;

app.use(cors_config)
app.use(express.json());
app.use(GroupRoutes);

const io = socket_server(httpServer);
initializeSocket(io);


initializeServers(httpServer,port);
