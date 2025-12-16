const mongoose = require('mongoose');

const foodpartnerSchema = new mongoose.Schema({
    businessName: {
        type: String,
        required: true
    }, 
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    } 
}, { timestamps: true });

const foodPartnerModel = mongoose.model('foodpartner', foodpartnerSchema);

module.exports = foodPartnerModel;