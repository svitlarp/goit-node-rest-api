import 'dotenv/config'
import express from "express";
import morgan from "morgan";
import cors from "cors";
import contactsRouter from "./routes/contactsRouter.js";
import "dotenv/config";
import connectDatanbase from "./db/connectDatabase.js";


const app = express(); 

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: `${req.method} ${req.url} not found` });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

await connectDatanbase();

app.listen(3000, () => {
  console.log("Server is running. Use our API on port: 3000");
});
