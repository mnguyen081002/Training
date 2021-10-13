import mysql from 'mysql2';
import config from './config';
const pool = mysql.createPool({
  host: config.host,
  password: config.password,
  database: config.database,
  user: config.user,
});

export default pool.promise();
