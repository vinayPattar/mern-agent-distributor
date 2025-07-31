const express = require('express');
const router = express.Router();
// const { login } = require('../controllers/AuthController');
const { addAgent } = require('../controllers/agentController');

router.post('/add-agent', addAgent);

module.exports = router;
