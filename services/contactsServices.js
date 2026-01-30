import fs from "fs/promises";
import path from "path";
import {idGenerator} from "../helpers/idGenerator.js";


const __dirname = import.meta.dirname;
const contactsPath = path.join(__dirname, 'db', 'contacts.json');

async function readContactFile(filePath) {
    try {
        const data = await fs.readFile(filePath, 'utf8' );
        if (!data.trim()) {
            return [];
        }
        return JSON.parse(data);
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.error('Contacts file not found.');
        } else if (error instanceof SyntaxError) {
            console.error('The data in the file is not valid JSON data.');
        } else {
            console.error('Failed to read contacts file:', error.message);
        }
        process.exit(1);
    }
}

export async function listContacts() {
    return await readContactFile(contactsPath);
}


export async function getContactById(contactId) {
    if (!contactId) {
        return null;
    }
    const contacts = await listContacts();    
    return contacts.find(contact => contact.id === contactId) || null;
}


export async function removeContact(contactId) {
    if (!contactId) {
        return null;
    }
    const contacts = await readContactFile(contactsPath);
    const index = contacts.findIndex(contact => contact.id === contactId);

    if (index === -1) {
        return null;
    }
    const [removedContact] =  contacts.splice(index, 1);
    await fs.writeFile(
        contactsPath,
        JSON.stringify(contacts, null, 2),
        'utf8'
    );
    return removedContact;
}

export async function addContact(name, email, phone) {
  if (!name || !email || !phone) {
    throw new Error("Missing required contact fields");
  }  
  const contacts = await readContactFile(contactsPath);
  
  const generated_id = id_generator(20);
  contacts.push({
    id: generated_id, 
    name: name, 
    email: email, 
    phone: phone});
  await fs.writeFile(
    contactsPath, 
    JSON.stringify(contacts, null, 2), 
    'utf8');
  return getContactById(generated_id);
}