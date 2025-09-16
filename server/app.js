// const express = require('express');
// const connectDB = require('./db');
import express from 'express';
import connectDB from "../server/src/dataBase/db.js";
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerOptions from "../server/src/swagger/swaggerOptions.js";
import cors from 'cors';
const app = express();

connectDB();

import routerAuth from "../server/src/routes/routesAuth.js";
import routerContact from "../server/src/routes/routesContact.js";
// const routerAuth = require('./routes/routesAuth');
app.use(express.json());
app.use(cors());

// Route de base
app.get('/', (req, res) => {
    res.send('Bonjour, monde !');
});
app.use('/api/auth', routerAuth);
app.use('/api/contacts', routerContact);

const swaggerSpecs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Démarrer le serveur
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
});