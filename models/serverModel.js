const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const housingSchema = new Schema({
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
    type: {
        type: String,
        required: true,
    }, 
    
}, { timestamps: true });

const Housing = mongoose.model('Housing', housingSchema);

module.exports = Housing;
