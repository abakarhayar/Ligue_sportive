// backend/routes/materielRoutes.js
const express = require('express');
const router = express.Router();
const materielController = require('../controllers/materielController');

// Routes pour le matériel
router.post('/', materielController.createMateriel); // Ajouter un matériel
router.get('/', materielController.getMateriels); // Afficher tous les matériels
router.get('/:id', materielController.getMaterielById); // Afficher un matériel par ID
router.put('/:id', materielController.updateMateriel); // Mettre à jour un matériel
router.delete('/:id', materielController.deleteMateriel); // Supprimer un matériel

module.exports = router;
