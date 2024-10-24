// backend/routes/locationRoutes.js
const express = require('express');
const router = express.Router();
const locationController = require('../controllers/locationController');

// Routes pour les locations
router.post('/', locationController.createLocation); // Créer une location
router.get('/', locationController.getLocations); // Obtenir toutes les locations
router.put('/:id/return', locationController.returnLocation); // Marquer une location comme retournée
router.delete('/:id', locationController.deleteLocation); // Supprimer une location

module.exports = router;
