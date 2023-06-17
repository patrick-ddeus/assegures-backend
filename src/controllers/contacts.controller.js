import Contacts from "../models/contacts.model.js";

const getContacts = async function (req, res) {
    try {
        const contacts = await Contacts.findAll({});
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createContact = async (req, res) => {
    const { avatar, name, role, phone } = req.body;
    try {
        const newContact = await Contacts.create({
            avatar,
            name,
            role,
            phone,
        });

        res.status(201).json({ contact: newContact });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export default {
    getContacts,
    createContact
};