const express = require("express")
const router = express.Router(); 
const UserController = require('../controllers/userController');

router.post('/login', UserController.loginUser);

// will add more options for the future like sign up new user

module.exports = router;
