const router =require('express').Router()
const User = require('../model/User')
const {registerValidation} = require('../validation')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
// Validation before create User


router.post('/register',async(req, res)=>{
    const {error} =registerValidation(req.body)
//    const validation=schema.validate(req.body)
    if(error)
        return res.status(400).send(error.details[0].message)
//Check if the email is already in the database

    const emailUserExist = await User.findOne({email: req.body.email})
    if(emailUserExist)
        return res.status(400).send('Email is already exists.')

//Hash Password
    var salt = await bcrypt.genSalt(10);
    var hashPassword = await bcrypt.hash(req.body.password, salt);
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword
    })
   
    try{
        const savedUser = await user.save();
        res.send(savedUser)
    }catch(err){
        res.status(400).send(err)
    }
})


/////////////Login//////////////////////
router.post('/login',async(req, res)=>{
    const {error} =registerValidation(req.body)
//    const validation=schema.validate(req.body)
    if(error)
        return res.status(400).send(error.details[0].message)
    const user = await User.findOne({email: req.body.email})
    if(!user)
        return res.status(400).send('Email is not exists.')

    const validPassword = bcrypt.compare(req.body.password, user.password)

    if(!validPassword)
        return res.status(400).send('Password is invalid.')

    // Create token
    const token = jwt.sign({_id: user.id}, process.env.TOKEN_SECRET)
    res.header('auth-token', token).send(token)

    
    res.send('Logged in!')

})
module.exports = router