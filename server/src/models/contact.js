import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: Number, required: true }
})

const Contact = mongoose.model('Contact', contactSchema);

export default Contact;