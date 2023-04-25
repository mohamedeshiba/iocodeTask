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
    console.log("here2");
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

auth_Router.post('/reset', async (req, res)=>{
    const {email} = req.body;
    const user = await User.find({email:email});
    console.log(user[0]);
    if(user[0]){
      const newPassword = generatePassword(10);
      const newHashedPassword = bcrypt.hashSync(newPassword,10);
      const updated = await User.findByIdAndUpdate(user[0]._id, {password:newHashedPassword}, {new: true}).catch((err) => res.status(400).send(err));
      sendEmail(user[0], "New account password", "Your new password is "+newPassword);
      res.send(updated);
    }else{
      res.sendStatus(401);
    }
  });

  auth_Router.post('/refreshToken', (req, res) => {
    const refreshToken = req.body.token;
    if (refreshToken == null) return res.sendStatus(401);
    if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403)
      const accessToken = generateAccessToken(user);
      res.json({ accessToken: accessToken })
    })
  });

  function generatePassword(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
  }

  // to be changed 

  const sendEmail = async (user, subject, body)=>{
    const email = user.email;
    const nodeMailer = require('nodemailer');
    const dotenv = require('dotenv');
    dotenv.config();
    const transporter = nodeMailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'borto2an5@gmail.com',
        pass: process.env.BORTO_PW
      }
    });
    const mailOptions = {
      from: 'mohamedeshiba08@gmail.com',
      to: email,
      subject: subject,
      text: body
  
    };
    transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
    });
  }

  
auth_Router.delete('/logout', (req, res) => {
    refreshTokens = refreshTokens.filter(token => token !== req.body.token);
    res.sendStatus(204);
  });
  

module.exports = auth_Router;

