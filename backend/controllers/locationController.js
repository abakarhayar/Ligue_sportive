// backend/controllers/locationController.js
const Location = require('../models/Location');
const Materiel = require('../models/Materiel');

// Créer une nouvelle location
exports.createLocation = async (req, res) => {
  try {
    const { user, materiel, startDate, endDate } = req.body;

    // Vérifier si le matériel est disponible
    const materielItem = await Materiel.findById(materiel);
    if (!materielItem || !materielItem.available) {
      return res.status(400).json({ message: 'Le matériel n\'est pas disponible pour la location.' });
    }

    // Créer la location
    const newLocation = new Location({ user, materiel, startDate, endDate });
    await newLocation.save();

    // Mettre à jour la disponibilité du matériel
    materielItem.available = false;
    await materielItem.save();

    res.status(201).json({ message: 'Location créée avec succès', location: newLocation });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Obtenir toutes les locations
exports.getLocations = async (req, res) => {
  try {
    const locations = await Location.find().populate('user').populate('materiel');
    res.status(200).json(locations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Marquer un matériel comme retourné
exports.returnLocation = async (req, res) => {
  try {
    const locationId = req.params.id;

    // Trouver la location
    const location = await Location.findById(locationId).populate('materiel');
    if (!location) {
      return res.status(404).json({ message: 'Location non trouvée' });
    }

    // Marquer comme retournée
    location.returned = true;
    await location.save();

    // Mettre à jour la disponibilité du matériel
    const materielItem = location.materiel;
    materielItem.available = true;
    await materielItem.save();

    res.status(200).json({ message: 'Matériel retourné avec succès' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Supprimer une location
exports.deleteLocation = async (req, res) => {
  try {
    const locationId = req.params.id;

    // Supprimer la location
    const deletedLocation = await Location.findByIdAndDelete(locationId);
    if (!deletedLocation) {
      return res.status(404).json({ message: 'Location non trouvée' });
    }

    res.status(200).json({ message: 'Location supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
