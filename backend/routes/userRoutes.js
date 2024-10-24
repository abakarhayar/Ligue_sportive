// backend/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Routes pour les utilisateurs
router.post('/register', userController.registerUser); // Inscription d'un utilisateur
router.post('/login', userController.loginUser); // Connexion d'un utilisateur
router.get('/', userController.getUsers); // Obtenir tous les utilisateurs
router.put('/:id', userController.updateUser); // Mettre à jour un utilisateur
router.delete('/:id', userController.deleteUser); // Supprimer un utilisateur

module.exports = router;
