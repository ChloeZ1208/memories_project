/*
 * All routes related to user
 */
import express from 'express'
import { signup, login } from '../controllers/users.js';

const userRoutes = express.Router();

userRoutes.post('/signup', signup);
userRoutes.post('/login', login);

export default userRoutes;