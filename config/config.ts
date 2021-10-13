import dotenv from 'dotenv';
dotenv.config();

const config = {
  secret: process.env.JWT_SECRET,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
};
export default config;
