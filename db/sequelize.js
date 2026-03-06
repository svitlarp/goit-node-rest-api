import { Sequelize } from "sequelize";


const port = process.env.DATABASE_PORT || 5432;

const sequelize = new Sequelize({
    host: process.env.DATABASE_HOST,
    username: process.env.DATABASE_USERNAME,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    port: port,
    dialect: "postgres",
    dialectOptions: {
        ssl: true,
    }
});


export default sequelize;
