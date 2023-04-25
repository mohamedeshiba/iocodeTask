/**
 * @author Mohamed Eshiba
 */

// -------------------------------------------------

/**
 * Importing npm needed modules
 */


const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');// http logger
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const dotenv = require("dotenv");
const cors = require("cors"); // connect the node with react


const MongoDBHandler = require("./database/MongoDB");
const UserRepository = require("./repository/userRepository");

const user_router = require("./routes/user");
const auth_router = require("./routes/authenticationServer");

/**
 * loads the .env file into the process.env (environment variables)
 */
dotenv.config();
/**
 * Setting the port number
 */
const PORT = process.env.PORT || 8000;
const app = express();
app.use(cors());
app.use(logger('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
dotenv.config();
const MONGODB_URI = process.env.MONGODB_URI;
const handler = new MongoDBHandler(MONGODB_URI);
handler.connect().then((result)=>console.log("Database Connected successfully")).catch((err)=>console.log(err));
app.use("/user/auth/",auth_router);
app.use("/user/", user_router);

app.listen(PORT, () => {
    console.log(`Listening to requests on http://localhost:${PORT}`);
});


module.exports = app;
