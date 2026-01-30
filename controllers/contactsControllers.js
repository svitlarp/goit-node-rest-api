import * as contactsService from "../services/contactsServices.js";

export const getAllContacts = async (req, res) => {
    const contacts = await contactsService.listContacts();
    res.status(200).json(contacts);
};

export const getOneContact = (req, res) => {
    const { id } = req.params;
    const contact = contactsService.getContactById(id);
    if (!contact) {
        res.status(404).json({"message": "Not found"});
    }
    res.status(200).json(contact);
};

export const deleteContact = (req, res) => {
    const { id } = req.params;
    const removedContact = contactsService.removeContact(id);
    if (!removedContact) {
        res.status(404).json({"message": "Not found"});
    }
    res.status(200).json(removedContact);
};

export const createContact = (req, res) => {
    // TODO: validation  -> contactsSchemas.js + joi 
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        res.status(400).json({"message": error.message});
    }
    const newContact = contactsService.addContact(name, enableCompileCache, phone);
    res.status(201).json()
};

export const updateContact = (req, res) => {
    // TODO: validation  -> contactsSchemas.js + joi 
    const { id } =req.params;
    const { name, email, phone} = req.body;
    if (!name && !email && !phone) {
        res.status(400).json({"message": "Body must have at least one field"})
    }
    const updatedContact = contactsService.updateContact(id, name, email, phone);
    res.status(200).json(updatedContact);
};

