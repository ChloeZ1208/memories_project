import jwt from "jsonwebtoken";

const secret = 'test';

// if a user wants to like a post
// click the like button => auth middleware(next) => like controllers

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500; // greater than 500 is goolgle auth

    let decodedData;

    if (token && isCustomAuth) {      
      decodedData = jwt.verify(token, secret);

      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);

      req.userId = decodedData?.sub; // sub is the id for google
    }    

    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;