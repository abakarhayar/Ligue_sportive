// backend/controllers/userController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Inscription d'un nouvel utilisateur
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Cet utilisateur existe déjà' });
    }

    // Hachage du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer un nouvel utilisateur
    const newUser = new User({ name, email, password: hashedPassword, role });
    await newUser.save();
    res.status(201).json({ message: 'Utilisateur créé avec succès' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getUserById = async (req, res) => {
    try {
      const userId = req.params.id;
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

// Connexion d'un utilisateur
exports.loginUser = async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
   
      if (!user) {
        return res.status(404).send({ error: "User not found" });
      }
   
      const correspondance = await bcrypt.compare(req.body.password, user.password);
   
      if (!correspondance) {
        return res.status(401).send({ error: "Invalid password" });
      }
   
      res.status(200).json({ message: "Connexion réussie", userId: user._id });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  };
   

// Obtenir la liste des utilisateurs (admin seulement)
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Supprimer un utilisateur
exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: 'Utilisateur non trouvé' });
    res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mettre à jour un utilisateur
exports.updateUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const userId = req.params.id;

    // Trouver l'utilisateur par son ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    // Mettre à jour les informations de l'utilisateur
    if (name) user.name = name;
    if (email) user.email = email;
    if (role) user.role = role;

    // Mettre à jour le mot de passe si fourni
    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    // Sauvegarder les modifications
    await user.save();

    res.status(200).json({ message: 'Utilisateur mis à jour avec succès', user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
