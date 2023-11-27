const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/jsguru');

        console.log('Successfully connected to the database!');
    } catch (err) {
        console.log(`Database error: ${err}`)
    }
}

module.exports = connectDB;