const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const mongo_contact = process.env.mongo_contact;

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(mongo_contact);
        console.log(`Connexion réussi avec MongoDB: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Erreur de connexion à MongoDB: ${error.message}`);
        process.exit(1);
    }
}
module.exports = connectDB;