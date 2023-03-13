import dotenv from 'dotenv';

dotenv.config();

const configs = {
  env: process.env.ENV,
  host: process.env.HOST,
  port: process.env.PORT as unknown as number,
  db_host: process.env.POSTGRES_URI,
  db_port: process.env.POSTGRES_PORT as unknown as number,
  db_name: process.env.POSTGRES_DB,
  db_user: process.env.POSTGRES_USER,
  db_password: process.env.POSTGRES_PASSWORD,
  salt_rounds: process.env.SALT_ROUNDS as unknown as number,
  backend_host: process.env.BACKEND_SERVER_HOST,
  frontend_host: process.env.FRONTEND_SERVER_HOST
};
export default configs;
