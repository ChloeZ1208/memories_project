import axios from 'axios';

const API = axios.create({ baseURL: 'https://memories-project-zdq.herokuapp.com/' });

// happen before each of the request - to send the token to the backend
// so that the middleware can verify that we are actually login
API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }
  return req;
});

export const fetchPosts = (page) => API.get(`/posts?page=${page}`);

export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);

export const fetchPost = (id) => API.get(`/posts/${id}`);

export const createPost = (newPost) => API.post('/posts', newPost);

export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);

export const deletePost = (id) => API.delete(`/posts/${id}`);

export const likePost = (id) => API.patch(`/posts/${id}/likePost`);

export const signUp = (formData) => API.post('/user/signup', formData);

export const logIn = (formData) => API.post('/user/login', formData);

