import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
const DB_URI = process.env.DB_URI;

async function connectToDatabase() {''
  try {
    await mongoose.connect(DB_URI, {
      dbName: "deepread_database",
    });
    console.log('Connected to the database successfully');
  } catch (error) {
    console.error('Database connection error:', error);
    throw error;
  }
}

export { connectToDatabase };