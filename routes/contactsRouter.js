import express from "express";
import {
  getContactsController,
  getContactByIdController,
  addContactController,
  updateContactController,
  deleteContactController
} from "../controllers/contactsControllers.js";
import validateBody from "../helpers/validateBody.js";
import { createContactSchema, updateContactSchema } from "../schemas/contactsSchemas.js";


const contactsRouter = express.Router();

contactsRouter.get("/", getContactsController);

contactsRouter.get("/:id", getContactByIdController);

contactsRouter.post("/", validateBody(createContactSchema), addContactController);

contactsRouter.put("/:id", validateBody(updateContactSchema), updateContactController);

contactsRouter.delete("/:id", deleteContactController);

export default contactsRouter;
