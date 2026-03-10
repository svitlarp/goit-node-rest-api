import HttpError from "../helpers/HttpError.js";
import * as contactsService from "../services/contactsServices.js";


export const getContactsController = async (req, res) => {
    const ownerId = req.user.id;
    const { isFavorite } = req.query;
    const contacts = await contactsService.listContacts(ownerId, isFavorite);
    res.status(200).json(contacts);
};

export const getContactController = async (req, res) => {
    const ownerId = req.user.id;
    const { id } = req.params;
    const contact = await contactsService.getContact(id, ownerId);
    if (!contact) {
        throw HttpError(404, `Contact with id: ${id} not found`);
    }
    res.status(200).json(contact);
};

export const addContactController = async (req, res) => {
    console.log("req.user: ", req.user);
    const { name, email, phone, favorite } = req.body;
    const owner = req.user.id;    // const {id: user_id} = req.user;
    const newContact = await contactsService.addContact({ name, email, phone, favorite, owner });
    res.status(201).json(newContact);
};


export const updateContactController = async (req, res) => {
    const ownerId = req.user.id;
    const { id } = req.params;
    const data = req.body;
    if (!data) {
        throw HttpError(400, "Missing data to update the Contact");
    }
    const updatedContact = await contactsService.updateContact(id, data, ownerId);
    if (!updatedContact) {
        throw HttpError(404, `Contact with id: ${id} not found`);
    }
    res.status(200).json(updatedContact);
};

export const deleteContactController = async (req, res) => {
    const ownerId = req.user.id;
    const { id } = req.params;
    const removedContact = await contactsService.removeContact(id, ownerId);
    if (!removedContact) {
        throw HttpError(404, `Contact with id: ${id} not found`);
    }
    res.status(200).json(removedContact);
};

export const updateStatusContactController = async (req, res) => {
    const ownerId = req.user.id;
    const { id } = req.params;
    const { favorite } = req.body;
    const contact = await contactsService.updateStatusContact(id, favorite, ownerId);
    if (!contact) {
        throw HttpError(404, `Contact with id: ${id} not found`);
    }
    res.status(200).json(contact);
};
