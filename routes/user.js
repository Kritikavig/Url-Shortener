//Routes for handling sign up and authentication

const express = require('express');
const router = express.Router();
const {handleUserSignUp, handleLogin} = require('../controllers/user');

router.post("/", handleUserSignUp);
router.post("/login", handleLogin);

module.exports = router;