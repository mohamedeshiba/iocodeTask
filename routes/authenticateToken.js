const express = require("express");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const app = express();
app.use(express.json());
dotenv.config();

function authenticate(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token){
        return res.sendStatus(401);
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err){
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    })
}
module.exports = authenticate;