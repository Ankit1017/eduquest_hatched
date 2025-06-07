const mongoose = require('mongoose');
const colors = require('colors');

function dbConnection() {
    // MongoDB connection
    const mongoURI = 'mongodb://127.0.0.1:27017/questiondb?retryWrites=true&w=majority';
    // mongodb+srv://eduquest:Ankit%40786@cluster0.t2p0msl.mongodb.net/questiondb?retryWrites=true&w=majority
    mongoose.connect(mongoURI, {
    }).then(() => console.log('MongoDB connected'.info.bgWhite))
        .catch(err => console.log('MongoDB connection error:'.black.bgRed, err));
}

module.exports = { dbConnection };