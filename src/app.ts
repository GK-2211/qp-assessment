import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool, { checkDatabaseConnection } from './config/db';
import { adminRouter } from './routes/admin.routes';
import { userRouter } from './routes/user.routes';
import { authRouter } from './routes/auth.routes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/admin', adminRouter);
app.use('/api/user', userRouter);

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

