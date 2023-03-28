const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
const express = require("express");
const app = express();
const auth_Router = express.Router();
const bcrypt = require('bcrypt');
const UserRepository = require("../repository/userRepository");
const userRepository = new UserRepository();
app.use(express.json());

auth_Router.post("/login", async (req, res) => {
    const {email, password} = req.body;
    const user = await userRepository.findOneByEmail(email);
    if (user) {
        const compare = await bcrypt.compare(password, user.password);
        if (compare) {
            const {_id, email, password, isAdmin} = user;
            const authenticateUser = {_id, email, password, isAdmin};
            const token = generateAccessToken(authenticateUser);
            res.status(200).json({auth: true, token: token, user:user});
        }
        else {
            res.status(404).send({auth: false, message: "Wrong Password"});
        }
    }
    else {
        res.status(404).send({auth: false, message: "User not found"});
    }
});


function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
}

module.exports = auth_Router;