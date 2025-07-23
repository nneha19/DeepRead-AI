import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from "cors";
import {connectToDatabase} from "/config/db.js";
import Messagerouter from "./routes/messageRoutes.js";
import Authrouter from "./routes/authRoutes.js";


const app=express();
const PORT=process.env.PORT || 3000;

app.use(cors());
app.use(express.json());


app.use("/api/auth", Authrouter);
app.use("/api/messages", Messagerouter);


async function startServer() {
  try {
    await connectToDatabase();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to connect to database', error);
  }
}

startServer();
