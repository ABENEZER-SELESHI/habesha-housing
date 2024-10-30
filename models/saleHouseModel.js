const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomSchema = new Schema({
    roomType: {
        type: String,
        required: true
    },
    numberOfRooms: {
        type: Number,
        required: true
    },
    roomPictures: {
        type: [String],
        required: true
    }
});

const salehousingSchema = new Schema({
    fullHousePictures: {
        type: [String],  // Array to store three pictures
        required: true,
        validate: [arrayLimit, 'You can only upload exactly 3 full house pictures']
    },
    rooms: {
        type: [roomSchema],  // Array to store rooms dynamically
        required: true,
        validate: [roomsLimit, 'At least one room type must be provided.']
    },
    price: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        required: true,
    },
    location: {
        type: [String],
        required: true,
        validate: [locationParLimit, 'must have exactly two values']
    },
    description: {
        type: String,
    }
}, { timestamps: true });

// Ensure only exactly three full house pictures are uploaded
function arrayLimit(val) {
    return val.length === 3;
}

function locationParLimit(val) {
    return val.length === 2;
}

// Ensure that at least one room type is chosen
function roomsLimit(val) {
    return val.length > 0;  
}

const SaleHousing = mongoose.model('SaleHousing', salehousingSchema);

module.exports = SaleHousing;
