import { createConnection } from 'typeorm';
import app from './app';
import config from './config/config';
createConnection()
  .then(async (connection) => {
    app.listen(config.port, () => {
      console.log(`Now running on port ${config.port}`);
    });
  })
  .catch((error) => console.log(error));
