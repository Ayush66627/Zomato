const express = require('express');
const authController = require('../controllers/auth.controller');

const router = express.Router();

router.post('/user/register', authController.registerUser);
router.post('/user/login', authController.loginUser);
router.get('/user/logout', authController.logoutUser);

router.post('/food-partner/register', authController.registerfoodPartner);
router.post('/food-partner/login', authController.foodpartnerLogin);
router.get('/food-partner/logout', authController.foodpartnerLogout);

module.exports = router;