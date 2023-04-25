

/**
 * This module is a database model representing the post that a user can create
 * @type {module:mongoose}
 */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    homeAddress: {
        type: String,
        required: false,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;