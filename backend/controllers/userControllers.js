const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("../models/usersModel");

// Fetch User

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.findById(req.user.id);
  res.status(200).json(users);
  
});

// Register User

const signUpUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400).json({ message: "Please enter all fields" });
  }

  // Authenticate if user already exist
  else {
    const userExists = await User.findOne({ Email: email });
    console.log(userExists);
    if (userExists) {
      res.status(400).json({ message: "User Already Exist" });
    }
    
    else {

        // Hash Password using bcrypt
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = await User.create({
        Name: name,
        Email: email,
        Password: hashedPassword,
      });
      if (user) {
        res.status(201).json(
          {
            _id: user.id,
            name: user.Name,
            email: user.Email,
            token: generateToken(user._id)
          }
        );
      } else {
        res.status(400).json({ message: "Invalid User Data" });
      }
    }
  }
});

// Login User

const LogInUser = asyncHandler(async (req, res) => {
    const {email,password}= req.body;
    if(!email || !password){
        res.status(401).json({message:"Please enter email and password"});
    }
    
    // check for user exist in DB using email
    const user = await User.findOne({Email:email})
    

    // check if user exist then entered password is correct
    if(user && (await bcrypt.compare(password,user.Password))){
        res.status(200).json({
            _id:user.id,
            Name:user.Name,
            Email:user.Email,
            token: generateToken(user._id)

        })

    }else{
        res.status(400).json({message:"Invalid Credentials"})
    }

//   res.send("retrieved Data Successfully...");
});

// Update User Data

const updateUser = asyncHandler(async (req, res) => {
  //book id -> 
  //user id
  const bookshelf1 = await User.findById(req.user.id)
  const shelf = bookshelf1.bookShelf;
  console.log("hamari bookshelf ",shelf)
  shelf.push({book: req.body.id})
  console.log(shelf)

  if (!bookshelf1) {
    res.status(400);
    throw new Error("User Not Found!");
  } else {
    const updatedUser = await User.findOneAndUpdate({_id: req.user.id}, { $push:{bookshelf: {book: req.body.id} }});
    res.status(200).json(updatedUser);
  }
});



// Delete User Data

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(400).json({message:"User Not Found with this id"})
    
  } else {
    await User.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({ message: "User Deleted Successfully", id: req.params.id });
  }
});

// Function to Generate JWT Token
const generateToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn: "30d"
    })
}

module.exports = {
  getUsers,
  signUpUser,
  LogInUser,
  updateUser,
  deleteUser,
};
