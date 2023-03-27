const express = require('express');
const UserRepository = require("../repository/userRepository");
const router = express.Router();
const userRepository = new UserRepository();


router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post("/register",createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

// Define handler functions for each route
async function createUser(req, res) {
  try {
    const user = await userRepository.create(req.body.data);
  }
  catch (err){
    //todo handle errors later
  }
}
async function getAllUsers(req,res) {
  try {
    const users = await userRepository.findAll();
    res.status(200).send(users);
  }
  catch(err){
    //todo handle errors later
  }
}

async function getUserById(req, res) {
  try {
    const user = await userRepository.read(req.params.id);
    res.send(user);
  }
  catch (err){
    //todo handle errors later
  }
}

async function updateUser(req, res) {
  try {
    const updatedUser = await userRepository.update(res.params.id,req.body);
    res.status(200).send(updatedUser);
  }
  catch (err){
    //todo handle errors later
  }
}

async function deleteUser(req, res) {
  try {
   const user = await userRepository.delete(res.params.id);
   res.status(200).send(user);
  }
  catch (err){
    //todo handle errors later
  }
}


module.exports = router;
