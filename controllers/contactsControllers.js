import HttpError from "../helpers/HttpError.js";
import * as contactsService from "../services/contactsServices.js";


export const getContactsController = async (req, res) => {
    const contacts = await contactsService.listContacts();
    res.status(200).json(contacts);
};

export const getContactByIdController = async (req, res) => {
    const { id } = req.params;
    const contact = await contactsService.getContactById(id);
    if (!contact) {
        throw HttpError(404, `Contact with id: ${id} not found`);
    }
    res.status(200).json(contact);
};

export const addContactController = async (req, res) => {
    const {name, email, phone} = req.body;
    if (!name || !phone) {
        throw HttpError(400, "Missing required name field");
    }
    const newContact = await contactsService.addContact({name, email, phone});
    res.status(201).json(newContact);
};

export const updateContactController = async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    if (!data) {
        throw HttpError(400, "Missing data to update the Contact");
    }
    const updatedContact = await contactsService.updateContact(id, data);
    if (!updatedContact) {
        throw HttpError(404, `Contact with id: ${id} not found`);
    }
    res.status(200).json(updatedContact);
};

export const deleteContactController = async (req, res) => {
    const { id } = req.params;
    const removedContact = await contactsService.removeContact(id);
    if (!removedContact) {
        throw HttpError(404, `Contact with id: ${id} not found`);
    }
    res.status(200).json(removedContact);
};
