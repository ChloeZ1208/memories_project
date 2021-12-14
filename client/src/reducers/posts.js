export default (posts = [], action) => { //state always have to have a value, rename states to posts
  switch(action.type) {
    case 'FETCH_ALL':
      return action.payload;
    case 'CREATE':
      return [...posts, action.payload]; //spread old posts, add new post(action.payload)
    default:
      return posts;
  }
}