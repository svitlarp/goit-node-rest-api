import 'dotenv/config'
import express from "express";
import morgan from "morgan";
import cors from "cors";
import contactsRouter from "./routes/contactsRouter.js";
import "dotenv/config";
import connectDatanbase from "./db/connectDatabase.js";
import authRouter from './routes/authRouter.js';
import notFoundHandler from './middlewares/notFoundHandler.js';
import errorHandler from './middlewares/error.handler.js';
import sequelize from './db/sequelize.js';
// import User from './db/models/User.js';


const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use("/api/contacts", contactsRouter);
app.use("/api/auth", authRouter);

app.use(notFoundHandler);
app.use(errorHandler);

await connectDatanbase();
// await sequelize.sync({ alter: true});
// await User.sync();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running. Use our API on port: ${port}`);
});
