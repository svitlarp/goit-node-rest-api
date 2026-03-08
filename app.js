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
// import User from './db/models/User.js';


const app = express(); 

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use("/api/contacts", contactsRouter);
app.use("/api/auth", authRouter);

app.use(notFoundHandler);
app.use(errorHandler);

await connectDatanbase();
// await User.sync();

app.listen(3000, () => {
  console.log("Server is running. Use our API on port: 3000");
});
