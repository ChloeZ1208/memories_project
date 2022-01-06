import express from 'express';
import bodyParser  from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';

const app = express();
// dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true })); // set pic upload limit
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors()); // enable the server to respond to preflight requests
app.use('/posts', postRoutes); //posts can only be accessed w/ localhost:5000/posts
app.use('/user', userRoutes);

const PORT = process.env.PORT || 5000;
const CONNECTION_URL = 'mongodb+srv://chloeMemories:chloeMemories@cluster0.my7yu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

// return a promise
mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))) // if connection successful
  .catch((error) => console.log(error.message)); // if connection fails

// host database on mongoDB cloud
// https://www.mongodb.com/cloud/atlas;

