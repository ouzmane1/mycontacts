import User from "../models/userAuth.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {

    const { email, password } = req.body;

    try{
        const existingUser = await User.findOne({ email });
        if(existingUser){
            return res.json({success: false, message: 'Utilisateur déjà existant'});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ email, password: hashedPassword });
        await newUser.save();

        res.json({success: true, message: 'Inscription réussie'});

    }catch(error){
        res.json({success: false, message: error.message});
    }
}

export const login = async (req, res) => {

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if(!user){
        return res.json({success: false, message: 'Utilisateur inexistant'});
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid){
        return res.json({success: false, message: 'Mot de passe incorrect'});
    }

    const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: '2h'});

    res.json({success: true, message: 'Connexion réussie', token});
}

export const logout = (req, res) => {
    res.json({ success: true, message: "Déconnexion réussie" });
}