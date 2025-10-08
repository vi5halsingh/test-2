const express = require('express');
const router = express.Router();
const user = require('../controllers/user.controller');
const { verifyToken } = require('../middlewares/auth.middleware');

router.get('/getprofile', verifyToken, user.getProfile);