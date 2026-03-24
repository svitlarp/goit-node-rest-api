import Contact from "../db/models/Contact.js";


export const listContacts = async (ownerId, isFavorite) => {
    const data = await Contact.findAll({
        where: {
            owner: ownerId
        },
        limit: 20,
    });
    return data;
};

export const getContact = async (contactId, ownerId) => {
    const contact = await Contact.findOne({
        where: {
            id: contactId,
            owner: ownerId,
        }
    });
    return contact || null;
};

export const addContact = async (data) => {
    return await Contact.create(data);
};


export const updateContact = async (contactId, data, ownerId) => {
    const contact = await Contact.findOne({
        where: {
            id: contactId,
            owner: ownerId,
        }
    });

    if (!contact) return null;

    await contact.update(data);
    return contact;
};

export const removeContact = async (contactId, ownerId) => {
    const contact = await Contact.findOne({
        where: {
            id: contactId,
            owner: ownerId,
        }
    });

    if (!contact) return null;

    await contact.destroy();
    return contact;
};

export const updateStatusContact = async (contactId, body, ownerId) => {
    const contact = await Contact.findOne({
        where: {
            id: contactId,
            owner: ownerId,
        }
    });

    if (!contact) return null;

    await contact.update({ favorite: body });
    return contact;
}
