const express = require('express');
const router = express.Router();
const serverControllers = require('../controllers/serverController');

// Home page
router.get('/home', serverControllers.homepage);

// Search page
router.get('/search', serverControllers.searchpage);

// For Sale page
router.get('/for-sale', serverControllers.forsale);

// For Rent page
router.get('/for-rent', serverControllers.forrent);

// Render rent house form
router.get('/post-rent-house', serverControllers.get_rent_house);

// Handle rent house form submission (file uploads handled in controller)
router.post('/post-rent-house', serverControllers.post_rent_house);

// Render sale house form
router.get('/post-sale-house', serverControllers.get_sale_house);

// Handle sale house form submission (file uploads handled in controller)
router.post('/post-sale-house', serverControllers.post_sale_house);

// Render hotel rooms form
router.get('/post-hotel-rooms', serverControllers.get_hotel_rooms);

module.exports = router;