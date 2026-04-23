import "dotenv/config";
import express from "express";
import { createServer } from "http";
import { pool } from "./config/db";
import socket_server from "./config/socket_server";
import AuthRoutes from "./routes/auth-routes";
import cors from 'cors';
import { cors_config } from "./config/cors";
import { initializeServers } from "./config/servers";

const app = express();
const httpServer = createServer(app);

const port = Number(process.env.AUTH_SERVER) || 8003;
app.use(cors_config);
app.use(express.json());
app.use(AuthRoutes) // FOR LOGIN 

initializeServers(httpServer,port);
