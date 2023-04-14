const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    
    Name:{
        type:String,
        required:[true, "Please enter a Name"]
    },
    Email:{
        type:String,
        required:[true, "Please enter an Email"],
        unique:true
    },
    Password:{
        type:String,
        required:[true, "Please enter a Password"]
    },
    bookShelf: [
        {
        book: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Book"
        },
    },
    ]
},
{
    timestamps: true,
}
)

module.exports = mongoose.model('User',userSchema);
