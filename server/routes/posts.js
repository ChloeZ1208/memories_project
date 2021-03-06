/*
 * All routes related to post
 */
import express from 'express'
import { getPosts, getPostsBySearch, getPost, createPost, updatePost, deletePost, likePost } from '../controllers/posts.js';
import auth from '../middleware/auth.js'

const postRoutes = express.Router();

postRoutes.get('/', getPosts);
postRoutes.get('/search', getPostsBySearch);
postRoutes.get('/:id', getPost);
postRoutes.post('/', auth, createPost);
postRoutes.patch('/:id', auth, updatePost); // frontend
postRoutes.delete('/:id', auth, deletePost); // frontend
postRoutes.patch('/:id/likePost', auth, likePost);// backend(like only once, can only like post once)

export default postRoutes;