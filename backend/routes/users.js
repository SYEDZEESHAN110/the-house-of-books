const express = require('express')
const router = express.Router()
const {getUsers,signUpUser,updateUser,deleteUser,LogInUser} = require('../controllers/userControllers')
const Goal = require('../models/usersModel')
const {protect}=require('../middleware/authMiddleware.js')

router.get('/',(req,res)=>{
    
    console.log('Retrieved User Successfully')
});

router.get('/userDetails',protect , getUsers);

router.put('/userUpdate', protect, updateUser)

router.delete('/userDelete/:id',deleteUser)

router.post('/userSignup',signUpUser)

router.post('/userLogin',LogInUser)



module.exports = router;