import Contact from "../models/contact.js";

const contacts = [];

// CREATE
export const createContact = async (req, res) => {
    try {
        const { firstName, lastName, phone } = req.body;
        const userId = req.user.userId;
        const newContact = new Contact ({ firstName, lastName, phone, userId });
        await newContact.save();
        res.status(201).json(newContact);
    } catch (error) {
        res.status(400).json({ message: "Données invalides", error: error.message });
    }
};

// READ
export const getContacts = async (req, res) => {
    try {
        const userId = req.user.userId;
        const contacts = await Contact.find({ userId });
        res.json(contacts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const updateContact = async (req, res) => {
    try {
        const { firstName, lastName, phone } = req.body;
        const contact = await Contact.findByIdAndUpdate(
            req.params.id,
            { firstName, lastName, phone },
            { new: true }
        );
        if (!contact) {
            return res.status(404).json({ message: "Contact non trouvé" });
        }
        res.json(contact);
    } catch (error) {
        res.status(400).json({ message: "ID ou données invalides" });
    }
};

// DELETE
export const deleteContact = async (req, res) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);
        if (!contact) {
            return res.status(404).json({ message: "Contact non trouvé" });
        }
        res.status(204).end();
    } catch (error) {
        res.status(400).json({ message: "ID invalide" });
    }
}

export const getContactById = async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        if (!contact) {
            return res.status(404).json({ message: "Contact non trouvé" });
        }
        res.json(contact);
    } catch (error) {
        res.status(400).json({ message: "ID invalide" });
    }
};

export default { createContact, getContacts, updateContact, deleteContact, getContactById };