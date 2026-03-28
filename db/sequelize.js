import { Sequelize } from "sequelize";


const port = process.env.POSTGRES_PORT || 5432;

const sequelize = new Sequelize({
    host: process.env.DATABASE_HOST,
    username: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: port,
    dialect: "postgres",
    dialectOptions: {
        // ssl: true,
    }
});


export default sequelize;
