import { Pool } from 'pg';
import * as dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const checkDatabaseConnection = async () => {
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT NOW()');
      client.release();
      console.log('Database connection successful:', result.rows[0].now);
      return true;
    } catch (error: any) {
      console.error('Database connection failed:', error.message);
      return false;
    }
  };
  
  export { pool as default, checkDatabaseConnection };
