const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const salehousingSchema = new Schema({
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
    
}, { timestamps: true });

const SaleHousing = mongoose.model('SaleHousing', salehousingSchema);

module.exports = SaleHousing;
