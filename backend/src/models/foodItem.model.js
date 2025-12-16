const mongoose = require('mongoose');

const foodItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }, 
    video: {
        type: String,
        required: true,
    },
    description: {
        type: String,
       
    },
    foodPartner : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'foodpartner',
        required: true
    },
    likeCount: {
        type: Number,
        default: 0
    },
    savesCount: {
        type: Number,
        default: 0
    }
},);

const foodModel = mongoose.model('fooditem', foodItemSchema);

module.exports = foodModel;