const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
    
  image: {
    type: String,
    // required: [true, "Please enter image URL"],
  },

  title: {
    type: String,
    required: [true, "Please enter the book title"],
  },

  author: {
    type: String,
    required: [true, "Please enter the Aurthor Name"],
  },

  category: {
    type: String,
    required: [true, "Please enter the book category"],
  },
  ISBN:{
    type:String,
    required:[true, "Please Enter ISBN Number"]
  },
  Rating:{
    type:String,
    
  },
  access: {
    type: String,
    required: [true, "Please enter the access type"],
  },

  description: {
    type: String,
    required: [true, "Please enter the book description"],
  },
  user:{
    type: mongoose.Schema.Types.ObjectId,
    // required:true,
    ref: 'User'
  }
},

);

module.exports = mongoose.model("Book",bookSchema)
