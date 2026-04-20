import "dotenv/config";
import express from "express";
import { createServer } from "http";
import { pool } from "./config/db";
import initiateSocket from "./config/socket_server";
import { UserQuery } from "./utils/query_handler";
import bcrypt from "bcrypt";
import AuthRoutes from "./routes/auth-routes";

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

    initiateSocket(httpServer)

    httpServer.listen(port, () => {
      console.log(`Listening to port ${port}`);
    });
  } catch (error) {
    console.log("Error running servers");
  }
};




app.post("/testDB", async (req, res) => {
  const { name } = req.body;

  try {
    const insertQuery = "INSERT INTO users ( name ) VALUES ($1)";
    const result = await pool.query(insertQuery, [name]);

    res.json({ msg: "Success" });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
});



initializeServers();
