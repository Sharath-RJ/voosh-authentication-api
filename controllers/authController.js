const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userRegister = async (req, res) => {
  const { name, email, password ,phone} = req.body;

  if (!name || !email || !password || !phone) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
      phone
    });
   
    res.status(201).json({message:"User Registered Successfully"});
  } catch (error) {
    res.status(500).json({ message: error.message });
  } 
}

module.exports = { userRegister }