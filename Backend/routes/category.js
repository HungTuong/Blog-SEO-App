const express = require('express');
const router = express.Router();

// controllers
const { requireSignin, adminMiddleware } = require('../controllers/auth');
const { create, list, read, remove } = require('../controllers/category');

// validators
const { runValidation } = require('../validators');
const { categoryCreateValidator } = require('../validators/category');

// methods
router.post('/category', categoryCreateValidator, runValidation, requireSignin , adminMiddleware, create);
router.get('/category', list)
router.get('/category/:slug', read)
router.delete('/category/:slug', requireSignin, adminMiddleware, remove)

module.exports = router; 