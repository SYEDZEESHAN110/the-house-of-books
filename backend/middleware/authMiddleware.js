const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/usersModel");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if ( 
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      //Get token from header
      token = req.headers.authorization.split(" ")[1];

      //verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      //Get user from user
      req.user = await User.findById(decoded.id).select(" -Password ");
      console.log("req.user", req.user)

      next();
    }
     catch (error) {
        console.log(error);
        res.status(401)
        throw new Error("Not Authorized")
     }
  }
  if(!token){
    res.status(400);
    throw new Error("Not Authorized, no token")
  } 
});

module.exports = {protect}