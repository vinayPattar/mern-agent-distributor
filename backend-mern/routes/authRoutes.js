  const express = require('express');
  const router = express.Router();
  const { login } = require('../controllers/AuthController');

  // Router to post the login api
  router.post('/login', login);

  module.exports = router;
