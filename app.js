import "dotenv/config";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import contactsRouter from "./routes/contactsRouter.js";
import connectDatanbase from "./db/connectDatabase.js";
import authRouter from './routes/authRouter.js';
import notFoundHandler from './middlewares/notFoundHandler.js';
import errorHandler from './middlewares/error.handler.js';

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use("/api/contacts", contactsRouter);
app.use("/api/auth", authRouter);

app.use(notFoundHandler);
app.use(errorHandler);

await connectDatanbase();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running. Use our API on port: ${port}`);
});
