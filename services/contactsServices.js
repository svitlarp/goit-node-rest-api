import Contact from "../db/models/Contact.js";

export const listContacts = async() =>{
    const data = await Contact.findAll();
    console.log('data: ', data);
    return data;
};

export const getContactById = async(contactId) => {
    const contact = await Contact.findOne({where: {id: contactId}}); 
    return contact || null;
};

export const addContact = async(data) => {
    return await Contact.create(data);
};

export const updateContact = async(contactId, data) => {
    const contact = await Contact.findByPk(contactId);

    if (!contact) return null;
    
    await contact.update(data);
    return contact;
};

export const removeContact = async(contactId) => {
    const contact = await Contact.findByPk(contactId);

    if (!contact) return null;

    await contact.destroy();
    return contact;
};

export const updateStatusContact = async(contactId, body) => {
    const contact = await Contact.findByPk(contactId);

    if (!contact) return null;

    await contact.update({favorite: body});
    return contact;
}
