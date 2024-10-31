const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

// Apply `upload.single('image')` to handle image file upload
router.get('/signup', authController.signup_get);
router.post('/signup', authController.upload.single('image'), authController.signup_post);

router.get('/login', authController.login_get);
router.post('/login', authController.login_post);

module.exports = router;
