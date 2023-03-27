const validateEmail =  require("../Validations/validateEmail");


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
        validate: {
            validator: validateEmail,
            message: `{VALUE} is not in the form of a mail`,
        },
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

    userName: {
        type: String,
        unique: true,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;