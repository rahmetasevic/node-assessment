const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    user_id: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
}, { versionKey: false });

module.exports = mongoose.model('Product', productSchema);