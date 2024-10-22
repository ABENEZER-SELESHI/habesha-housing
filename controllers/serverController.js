//serverController.js
const RentHousing = require('../models/rentHouseModel.js');
const SaleHousing = require('../models/saleHouseModel.js');
const multer = require('multer');
const mongoose = require('mongoose');
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

// RENT
// Render "For Rent" page
const forrent = (req, res) => {
    RentHousing.find().sort({createdAt: -1})
        .then((result) => {
            res.render('forRentPage', { title: 'for-rent-page', renthousings: result });
        })
        .catch((err) => {
            console.log(err);
        });
}

// Render the form for posting a house for rent
const get_rent_house = (req, res) => {
    res.render('rentHousePost', { title: 'rent-house-post' });
}

// Middleware for handling file uploads
const post_rent_house_middleware = upload.fields([
    { name: 'fullHousePictures1', maxCount: 1 },
    { name: 'fullHousePictures2', maxCount: 1 },
    { name: 'fullHousePictures3', maxCount: 1 },
    { name: 'roomPictures_Living Room', maxCount: 10 },
    { name: 'roomPictures_Bedroom', maxCount: 10 },
    { name: 'roomPictures_Kitchen', maxCount: 10 },
    { name: 'roomPictures_Bathroom', maxCount: 10 },
    { name: 'roomPictures_Storage Room', maxCount: 10 },
    { name: 'roomPictures_Garage', maxCount: 10 },
    { name: 'roomPictures_Specific Kind', maxCount: 10 }
]);

// Handle the POST request for posting a house for rent
const post_rent_house = (req, res) => {
    console.log(req.body);
    try {
        console.log(req.files);

        // Extract the three full-house pictures
        const fullHousePictures = [
            req.files['fullHousePictures1'][0].filename,
            req.files['fullHousePictures2'][0].filename,
            req.files['fullHousePictures3'][0].filename
        ];

        // Ensure roomTypes is always treated as an array
        let roomTypes = req.body.roomTypes || [];
        if (!Array.isArray(roomTypes)) {
            roomTypes = [roomTypes];  // Convert to an array if it's a single string
        }

        if (roomTypes.length === 0) {
            return res.status(400).send('At least one room type must be selected.');
        }

        const rooms = [];
        roomTypes.forEach((roomType) => {
            const numberOfRooms = req.body[`numberOf${roomType}s`];
            const roomPictures = req.files[`roomPictures_${roomType}`]?.map(file => file.filename) || [];

            rooms.push({
                roomType: roomType,
                numberOfRooms: numberOfRooms,
                roomPictures: roomPictures
            });
        });

        const rentHousing = new RentHousing({
            fullHousePictures: fullHousePictures,
            rooms: rooms,
            price: req.body.price,
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


const rent_details = async (req, res) => {
    const id = req.params.id;
    console.log("ID received:", id);

    if (!mongoose.Types.ObjectId.isValid(id)) {
        console.log("Invalid ObjectId");
        return res.status(400).send('Invalid Rent House ID.');
    }

    try {
        const renthousing = await RentHousing.findById(id);
        if (!renthousing) {
            console.log("Rent house not found in the database");
            return res.status(404).send('Rent House not found.');
        }
        console.log("Rent house found:", renthousing);
        return res.render('rentHouseDetails', { renthousing: renthousing, title: "detail" });
    } catch (error) {
        console.error("Error during database query:", error);
        return res.status(500).send('An error occurred while retrieving rent house details.');
    }
};

// SALE
// Render "For Sale" page
const forsale = (req, res) => {
    SaleHousing.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render('forSalePage', { title: 'for-sale-page', salehousings: result });
        })
        .catch((err) => {
            console.log(err);
        });
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

// Define get_hotel_rooms controller
const get_hotel_rooms = (req, res) => {
    res.render('hotelRoomsForm', { title: 'hotel-rooms-post' });
}

// Define post_hotel controller
const post_hotel = (req, res) => {
    res.send('Hotel posted successfully!'); // Adjust to your actual implementation
}

// Export the controller functions
module.exports = {
    homepage,
    forsale,
    forrent,
    get_rent_house,
    get_sale_house,
    searchpage,
    rent_details,
    post_rent_house: [post_rent_house_middleware, post_rent_house],
    post_sale_house: [upload.fields([
        { name: 'fullViewPicture', maxCount: 1 },  // Single full view picture
        { name: 'roomPicture[]', maxCount: 10 }    // Multiple room pictures
    ]), post_sale_house],
    get_hotel_rooms,
    post_hotel
};