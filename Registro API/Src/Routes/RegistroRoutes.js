const express = require('express');
const router = express.Router();
const { register } = require('../Controller/RegistroController');

router.post('/register', register);

module.exports = router;
