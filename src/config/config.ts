import dotenv from 'dotenv';
dotenv.config();

const config = {
  env: process.env.NODE_ENV,
  secret: process.env.JWT_SECRET || 'secret',
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.PORT || 8080,
};
export default config;
