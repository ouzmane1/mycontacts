const express = require('express');
const app = express();
const connectDB = require('./db');
connectDB();
// Route de base
app.get('/', (req, res) => {
    res.send('Bonjour, monde !');
});

// Démarrer le serveur
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
});