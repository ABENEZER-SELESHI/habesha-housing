// serverController.js
const Housing = require('../models/serverModel.js');
const RentHousing = require('../models/rentHouseModel.js');
const multer = require('multer');
const path = require('path');

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); 
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); 
    }
});

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 20 * 1024 * 1024 }, 
    fileFilter: (req, file, cb) => {
        // Accept images only
        if (!file.mimetype.startsWith('image/')) {
            return cb(new multer.MulterError('LIMIT_UNEXPECTED_FILE', 'Only image files are allowed!'));
        }
        cb(null, true);
    }
});

// Render homepage
const homepage = (req, res) => {
    res.render('homePage', { title: 'home-page' });
}

// Render search page
const searchpage = (req, res) => {
    res.render('search', { title: 'search-page' });
}

// Render "For Sale" page
const forsale = (req, res) => {
    res.render('forSalePage', { title: 'for-sale-page' });
}

// Render "For Rent" page
const forrent = (req, res) => {
    res.render('forRentPage', { title: 'for-rent-page' });
}

// Render the form for posting a house for rent
const get_rent_house = (req, res) => {
    res.render('rentHousePost', { title: 'rent-house-post' });
}

// Handle the POST request for posting a house for rent
const post_rent_house = (req, res) => {
    try {
        console.log(req.files); 

        // Check if files are present
        const fullViewPicture = req.files['fullViewPicture'] ? req.files['fullViewPicture'][0].filename : ''; 
        const roomPictures = req.files['roomPicture[]'] ? req.files['roomPicture[]'].map(file => file.filename) : []; 

        const renthousing = new RentHousing({
            fullViewPicture: fullViewPicture,
            number_of_rooms: req.body.number_of_rooms,
            roomPicture: roomPictures, 
            price: req.body.price,
            luxuryHouse: req.body.luxuryHouse,
            location: req.body.location,
            description: req.body.description,
            type: 'rent', 
        });

        renthousing.save()
            .then((result) => {
                res.redirect('/home');
            })
            .catch((err) => {
                console.log(err);
                res.status(500).send('Error saving the rent house.');
            });
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while processing your request.');
    }
};

// Render the form for posting a house for sale
const get_sale_house = (req, res) => {
    res.render('saleHousePost', { title: 'sale-house-post' });
}

// Handle the POST request for posting a house for sale
const post_sale_house = (req, res) => {
    try {
        const fullViewPicture = req.files['fullViewPicture'][0].filename; // Single full view picture
        const roomPictures = req.files['roomPicture[]'].map(file => file.filename); // Array of uploaded room picture filenames

        const housing = new Housing({
            fullViewPicture: fullViewPicture,
            number_of_rooms: req.body.number_of_rooms,
            roomPicture: roomPictures, // Store array of room picture filenames
            price: req.body.price,
            luxuryHouse: req.body.luxuryHouse,
            location: req.body.location,
            description: req.body.description,
            type: 'sale', // Set the house type to sale
        });

        housing.save()
            .then(() => res.redirect('/home'))
            .catch(err => {
                console.log(err);
                res.status(500).send('Error saving the sale house.');
            });
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while processing your request.');
    }
};

// Render the form for posting hotel rooms
const get_hotel_rooms = (req, res) => {
    res.render('hotelRoomPost', { title: 'hotel_rooms-post' });
};

// Export the controller functions
module.exports = {
    homepage,
    forsale,
    forrent,
    get_rent_house,
    get_sale_house,
    searchpage,
    get_hotel_rooms,
    // Multer middleware to handle file uploads
    post_rent_house: [upload.fields([
        { name: 'fullViewPicture', maxCount: 1 },  // Single full view picture
        { name: 'roomPicture[]', maxCount: 10 }    // Multiple room pictures
    ]), post_rent_house],
    post_sale_house: [upload.fields([
        { name: 'fullViewPicture', maxCount: 1 },  // Single full view picture
        { name: 'roomPicture[]', maxCount: 10 }    // Multiple room pictures
    ]), post_sale_house]
};
