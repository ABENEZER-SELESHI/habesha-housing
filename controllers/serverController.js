// serverController.js
const RentHousing = require('../models/rentHouseModel.js');
const SaleHousing = require('../models/saleHouseModel.js');
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

// 
// 
// 
// 
//RENT
// Render "For Rent" page
const forrent = (req, res) => {
    
    console.log(9)
    RentHousing.find().sort({createdAt: -1})
        .then((result) => {
            // res.send(result);
            res.render('forRentPage', { title: 'for-rent-page', renthousings: result});
        })
        .catch((err) => {
            console.log(err);
        })
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

        const rentHousing = new RentHousing({
            fullViewPicture: fullViewPicture,
            number_of_rooms: req.body.number_of_rooms,
            roomPicture: roomPictures, 
            price: req.body.price,
            luxuryHouse: req.body.luxuryHouse,
            location: req.body.location,
            description: req.body.description,
        });

        rentHousing.save()
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

// 
// 
// 
// 
// SALE
// Render "For Sale" page
const forsale = (req, res) => {
    console.log(9)
    SaleHousing.find().sort({createdAt: -1})
        .then((result) => {
            // res.send(result);
            res.render('forSalePage', { title: 'for-sale-page', salehousings: result});
        })
        .catch((err) => {
            console.log(err);
        })
}

// Render the form for posting a house for sale
const get_sale_house = (req, res) => {
    res.render('saleHousePost', { title: 'sale-house-post' });
}

// Handle the POST request for posting a house for sale
const post_sale_house = (req, res) => {
    try {
        const fullViewPicture = req.files['fullViewPicture'][0].filename; 
        const roomPictures = req.files['roomPicture[]'].map(file => file.filename);

        const saleHousing = new SaleHousing({
            fullViewPicture: fullViewPicture,
            number_of_rooms: req.body.number_of_rooms,
            roomPicture: roomPictures, 
            price: req.body.price,
            luxuryHouse: req.body.luxuryHouse,
            location: req.body.location,
            description: req.body.description,
        });

        saleHousing.save()
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

// 
// 
// 
// 
// HOTEL
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
