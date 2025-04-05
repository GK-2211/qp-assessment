import express from 'express';
import dotenv from 'dotenv';
import pool, { checkDatabaseConnection } from './config/db';



dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());


const startServer = async () => {
    const isConnected = await checkDatabaseConnection();
    
    if (isConnected) {
      app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
      });
    } else {
      console.error('Failed to start server due to database connection issues');
      process.exit(1);
    }
  };

  startServer();

