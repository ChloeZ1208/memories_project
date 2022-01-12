/*
 * A handler for the routes
 */
import PostMessage from "../models/postMessages.js"; // the input for getting access to the data
import mongoose from "mongoose";

export const getPosts = async (req, res) => {
  const { page } = await req.query;
  try {
    const LIMIT = 6; // the number of posts in one page

    const startIndex = (Number(page) - 1) * LIMIT;

    const total = await PostMessage.countDocuments({});

    // get the latest posts, only get limit posts, skip the posts that we alread got previously
    const posts = await PostMessage.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);

    res.status(200).json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT) });

  } catch (error) {

    res.status(404).json({ message: error.message });
  }
}

export const getPostsBySearch = async (req, res) => {
  const { searchQuery, tags } = await req.query;

  try {
    // convert it to the regular expression, which will make it easy for mongoDB to search in the db
    const title = new RegExp(searchQuery, 'i') //ignore text cases

    const posts = await PostMessage.find({ $or: [ { title }, { tags: { $in: tags.split(',') } } ] }); 

    res.json({ data: posts });
    
  } catch (error) {

    res.status(404).json({ message: error.message });

  }
}

export const getPost = async (req, res) => {
  const { id } = req.params;
  try {

    const post = await PostMessage.findById(id);

    res.status(200).json(post);
    
  } catch (error) {

    res.status(404).json({ message: error.message });

  }
}

export const createPost = async (req, res) => {
  const post = req.body;

  const newPost = new PostMessage({...post, creator: req.userId, createdAt: new Date().toISOString()});

  try {
    await newPost.save();
    
    res.status(201).json(newPost);
  } catch (error) {
    
    res.status(409).json({ message: error.message });
  }
}


export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, message, creator, selectedFile, tags } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No post with this id!");
  
  const updatedPost = { creator, title, message, tags, selectedFile, _id: id };
  
  await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });
  
  res.json(updatedPost);
}

export const deletePost = async (req, res) => {
  const { id: _id } = req.params; 

  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No post with this id!");
  
  await PostMessage.findByIdAndRemove(_id);
  
  res.json({ message: 'Post deleted successfully!'});
}

export const likePost = async (req, res) => {
  const { id: _id } = req.params; 

  // user authentication check
  if (!req.userId) return res.json({ message: 'Unauthenticated' });

  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No post with this id!");
  
  const post = await PostMessage.findById(_id);

  const index = post.likes.findIndex((id) => id === String(req.userId));

  if (index === -1) {
    post.likes.push(req.userId); // likes++
    // like the post
  } else {
    post.likes = post.likes.filter((id) => id !== String(req.userId)); // the current number of likes
    // dislike a post
  }

  const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, { new: true });

  res.status(200).json(updatedPost);

}