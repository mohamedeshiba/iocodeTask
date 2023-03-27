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
const MongoDBHandler = require("./database/MongoDB");

/**
 * loads the .env file into the process.env (environment variables)
 */
dotenv.config();
/**
 * Setting the port number
 */
const PORT = process.env.PORT || 8000;
const app = express();
app.use(logger('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
dotenv.config();
const MONGODB_URI = process.env.MONGODB_URI;

const handler = new MongoDBHandler(MONGODB_URI);
handler.connect().then((result)=>console.log("Connected successfully")).catch((err)=>console.log(err));

module.exports = app;
