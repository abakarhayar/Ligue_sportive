// backend/controllers/materielController.js
const Materiel = require('../models/Materiel');

// Créer un nouveau matériel
exports.createMateriel = async (req, res) => {
  try {
    const { name, description, category, available } = req.body;
    const newMateriel = new Materiel({ name, description, category, available });
    await newMateriel.save();
    res.status(201).json(newMateriel);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Obtenir la liste de tous les matériels
exports.getMateriels = async (req, res) => {
  try {
    const materiels = await Materiel.find();
    res.status(200).json(materiels);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtenir un matériel par ID
exports.getMaterielById = async (req, res) => {
  try {
    const materiel = await Materiel.findById(req.params.id);
    if (!materiel) return res.status(404).json({ message: "Matériel non trouvé" });
    res.status(200).json(materiel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mettre à jour un matériel
exports.updateMateriel = async (req, res) => {
  try {
    const { name, description, category, available } = req.body;
    const updatedMateriel = await Materiel.findByIdAndUpdate(
      req.params.id,
      { name, description, category, available },
      { new: true }
    );
    if (!updatedMateriel) return res.status(404).json({ message: "Matériel non trouvé" });
    res.status(200).json(updatedMateriel);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Supprimer un matériel
exports.deleteMateriel = async (req, res) => {
  try {
    const deletedMateriel = await Materiel.findByIdAndDelete(req.params.id);
    if (!deletedMateriel) return res.status(404).json({ message: "Matériel non trouvé" });
    res.status(200).json({ message: "Matériel supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
