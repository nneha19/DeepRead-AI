import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from "cors";
import { connectToDatabase } from './config/db.js';
import router from './routes/messageRoutes.js';



const app=express();
const PORT=process.env.PORT || 3000;

app.use(cors({
  origin: ['http://localhost:5173', 'https://deepreadai.vercel.app'],
  methods: ['GET', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());


app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});


// Health check route (required for Render)
app.get('/', (req, res) => {
  res.json({ status: 'Backend running', timestamp: new Date() });
});


app.use("/api/messages", router);


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
