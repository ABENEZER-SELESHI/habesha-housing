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

const renthousingSchema = new Schema({
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
    location: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    }
}, { timestamps: true });

// Ensure only exactly three full house pictures are uploaded
function arrayLimit(val) {
    return val.length === 3;
}

// Ensure that at least one room type is chosen
function roomsLimit(val) {
    return val.length > 0;  // Must have at least one room
}

const RentHousing = mongoose.model('RentHousing', renthousingSchema);

module.exports = RentHousing;
