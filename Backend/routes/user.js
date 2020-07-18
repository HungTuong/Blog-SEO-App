const express = require('express');
const router = express.Router();
const { requireSignin, authMiddleware } = require('../controllers/auth');
const { getUser } = require('../controllers/user');

router.get('/profile', requireSignin, authMiddleware, getUser);


module.exports = router;