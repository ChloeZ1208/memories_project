/*
 * A handler for the routes
 */
import PostMessage from "../models/postMessages.js"; // the input for getting access to the data
import mongoose from "mongoose";

export const getPosts = async (req, res) => {
  try {
    /* since this find() is async, add await so do the whole function */
    const postMessages = await PostMessage.find(); 

    res.status(200).json(postMessages);
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