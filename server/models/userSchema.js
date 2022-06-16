const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    age: {
        type: Number,
       // required: true
    },
    gender: {
        type: String,
       // required: true
    },
    password: {
        type: String,
      //  required: true
    },
    registrationDate: {
        type: Date,
      //  required: true
    },
    email: {
        type: String,
      //  required: true
    },
    bundelId: {
        type: [String],
    },
    likedMovies: {
        type: [String]
    },
    enrolledMovies: {
        type: [String]
    }
})
module.exports = mongoose.model('User',userSchema)