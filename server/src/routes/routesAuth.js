import express from 'express';
import { register, login, logout } from '../controllers/authController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const routerAuth = express.Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Inscription d'un utilisateur
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Utilisateur créé
 *       400:
 *         description: Email déjà utilisé
 */
routerAuth.post('/register', register);
/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Connexion d'un utilisateur
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Utilisateur connecté
 *       400:
 *         description: Email ou mot de passe incorrect
 */
routerAuth.post('/login', login);

routerAuth.post('/logout', logout);

/**
 * @swagger
 * /api/auth/protected:
 *   get:
 *     summary: Accès à une route protégée
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Accès autorisé
 *       401:
 *         description: Token manquant ou invalide
 */
routerAuth.get('/protected', authMiddleware, (req, res) => {
    res.json({ message: "Accès autorisé : Bienvenue ", user: req.user });
});

export default routerAuth;
