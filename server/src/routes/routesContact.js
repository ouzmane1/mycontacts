import express from 'express';
import { createContact, getContacts, updateContact, deleteContact, getContactById } from '../controllers/contactController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const routerContact = express.Router();

/**
 * @swagger
 * /api/contacts/:
 *   post:
 *     summary: Ajout d'un nouveau contact
 *     tags:
 *       - Contacts
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       201:
 *         description: Contact créé
 *       400:
 *         description: Données invalides
 */
routerContact.post('/', authMiddleware, createContact);
/**
 * @swagger
 *  /api/contacts/:
 *    get:
 *      summary: Récupération de tous les contacts
 *      tags:
 *        - Contacts
 *      responses:
 *        200:
 *          description: Liste des contacts
 *        500:
 *          description: Erreur serveur
 */
routerContact.get('/',authMiddleware, getContacts);

/**
 * @swagger
 * /api/contacts/{id}:
 *   get:
 *     summary: Récupère un contact par son ID
 *     tags:
 *       - Contacts
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID MongoDB du contact
 *     responses:
 *       200:
 *         description: Contact trouvé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 firstName:
 *                   type: string
 *                 lastName:
 *                   type: string
 *                 phone:
 *                   type: string
 *       404:
 *         description: Contact non trouvé
 */
routerContact.get('/:id', getContactById);
/**
 * @swagger
 * /api/contacts/{id}:
 *   put:
 *     summary: Met à jour un contact par son ID
 *     tags:
 *       - Contacts
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du contact
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *               lastname:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       200:
 *         description: Contact mis à jour
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 firstname:
 *                   type: string
 *                 lastname:
 *                   type: string
 *                 phone:
 *                   type: string
 *       404:
 *         description: Contact non trouvé
 */
routerContact.put('/:id', updateContact);
/**
 * @swagger
 * /api/contacts/{id}:
 *   delete:
 *     summary: Supprime un contact par son ID
 *     tags:
 *       - Contacts
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du contact
 *     responses:
 *       204:
 *         description: Contact supprimé
 *       404:
 *         description: Contact non trouvé
 */
routerContact.delete('/:id', deleteContact);

export default routerContact;