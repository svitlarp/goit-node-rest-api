import idGenerator from '../helpers/idGenerator.js';
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, "../db/contacts.json");

const updateContactList = contacts => fs.writeFile(
        dbPath,
        JSON.stringify(contacts, null, 2),
        'utf8'
    );

export const listContacts = async() =>{
    const data = await fs.readFile(dbPath, 'utf8');
    return JSON.parse(data);
};

export const getContactById = async(contactId) => {
    const contacts = await listContacts();    
    return contacts.find(contact => contact.id === contactId) || null;
};

export const addContact = async(data) => {
    const contacts = await listContacts();
    const newContact = {
        id: idGenerator(20),
        ...data,
    }
    contacts.push(newContact);
    await updateContactList(contacts);
    return newContact;
};

export const updateContact = async(contactId, data) => {
    const contacts = await listContacts();
    const index = contacts.findIndex(contact => contact.id === contactId);

    if (index === -1) return null;
    
    contacts[index] = {
        ...contacts[index],
        ...data,
    }
    await updateContactList(contacts);
    return contacts[index];
};

export const removeContact = async(contactId) => {
    const contacts = await listContacts();
    const index = contacts.findIndex(contact => contact.id === contactId);

    if (index === -1) return null;

    const [removedContact] = contacts.splice(index, 1);
    await updateContactList(contacts);
    return removedContact;
};

