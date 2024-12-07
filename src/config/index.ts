import dotenv from 'dotenv';
import path from 'path';


dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  database_url: process.env.DATABASE_URL || 'mongodb://localhost:27017/car_store', 
  port: process.env.PORT || 5000, 
};
