const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const renthousingSchema = new Schema({
    fullViewPicture: {
        type: String,
        required: true
    },
    number_of_rooms: {
        type: Number,
        required: true,
    },
    roomPicture: {
        type: [String],
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    luxuryHouse: {
        type: String,
    },
    location: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    }, 
    
}, { timestamps: true });

const RentHousing = mongoose.model('RentHousing', renthousingSchema);

module.exports = RentHousing;
