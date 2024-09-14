const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Register a new user
router.post('/users', userController.registerUser);

// Login a user
router.post('/login', userController.loginUser);

//Logout
router.post('/logout', userController.logout);

  
// Get all users (for administrative purposes)
router.get('/users', userController.getAllUsers);

// Get a specific user by ID
router.get('/users/:id', userController.getUserById);

// Update a user's details
router.put('/users/:id', userController.updateUser);

// Delete a user
router.delete('/users/:id', userController.deleteUser);

module.exports = router;
