const mongoose = require('mongoose')
const colors= require('colors')

const connectDB = async(url)=>{

    try{
const conn = await mongoose.connect(url);
        console.log(`MongoDB Connection Successfull - ${conn.connection.host}`.cyan.underline)
    } catch(error){
        console.log(error);
        process.exit
        
    }
}

module.exports = connectDB