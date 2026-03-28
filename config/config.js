import { fileURLToPath } from "node:url";
import path from "node:path";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const config = {
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT) || 5432,
  dialect: "postgres",
};

export default {
  "development": {
    "username": config.username,
    "password": config.password,
    "database": config.database,
    "host": config.host,
    "dialect": config.dialect
  },
  "test": {
    "username": config.username,
    "password": config.password,
    "database": config.database,
    "host": config.host,
    "dialect": config.dialect
  },
  "production": {
    "username": config.username,
    "password": config.password,
    "database": config.database,
    "host": config.host,
    "dialect": config.dialect,
    dialectOptions: {
      ssl:
        process.env.POSTGRES_SSL === "true"
          ? {
            ssl: {
              require: true,
              rejectUnauthorized: false,
            }
    } : {},
  },
}
}