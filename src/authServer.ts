import "dotenv/config";
import express from "express";
import { createServer } from "http";
import { pool } from "./config/db";
import initiateSocket from "./config/socket_server";
import AuthRoutes from "./routes/auth-routes";
import cors from 'cors';

const app = express();
const httpServer = createServer(app);

const port = process.env.AUTH_SERVER || 8003;
app.use(cors({
  origin:'http://localhost:5173',
  credentials:true,
  methods:["POST","GET"],
  allowedHeaders:['Content-Type','Authorization']
}));

app.use(express.json());
app.use(AuthRoutes) // FOR LOGIN 

const initializeServers = async () => {
  try {

    await pool.connect();

    pool.on('connect', () => console.log('DB running...'));
    pool.on('error', () => console.log('DB crash....'));

    await pool.query('SELECT 1');

    initiateSocket(httpServer)

    httpServer.listen(port, () => {
      console.log(`Listening to port ${port}`);
    });
  } catch (error) {
    console.log("Error running servers");
  }
};



initializeServers();
