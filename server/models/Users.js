const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true,
    },
    lname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    gender: {
        type: String,
        required: true,
    },
    batch: {
        type: String,
        required: true,
    },
    month : {
        type : String,
        required: true,
    },
    year : {
        type : Number,
        required: true,
    },
});

const Users = mongoose.model('YogaUser', userSchema);

module.exports = Users;