const express = require('express');
const { Router } = require('express');

const authController = require('../controllers/authController');

const router = express.Router();

router.get('/signup', authController.signup_get);
router.post('/signup', authController.signup_post);

router.get('/register', authController.register_get);
router.post('/register', authController.register_post);

router.get('/login', authController.login_get);
router.post('/login', authController.login_post);
//  router.post('/logout', );

module.exports = router;