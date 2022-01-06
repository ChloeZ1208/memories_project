import bcrypt from 'bcryptjs' //hash the password
import jwt from 'jsonwebtoken'

import User  from '../models/user.js'

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid Password!" });

    const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'test', { expiresIn: '2h' });

    res.status(200).json({ result: existingUser, token });

  } catch (error) {

    res.status(500).json({ message: "Something went wrong" });

  }
}

export const signup = async (req, res) => {
  const { email, password, confirmPassword, firstName, lastName } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    console.log(existingUser);

    if (existingUser) return res.status(400).json({ message: "User already exists!" });

    if (password !== confirmPassword) return res.status(400).json({ message: "Passwords don't match!" });

    const hashedPassword = await bcrypt.hash(password, 12); // 12 - salt length

    const newUser = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });

    const token = jwt.sign({ email: newUser.email, id: newUser._id }, 'test', { expiresIn: '2h' })
    
    res.status(201).json({ result: newUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    
    console.log(error);
  }
  
}