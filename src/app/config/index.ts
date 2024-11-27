import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join((process.cwd(), '.env')) });

export default {
  port: process.env.PORT,
  database: process.env.MONGODB_URI,
  bcript_salt_rounds: process.env.BCRIPT_SALT_ROUNDS,
};