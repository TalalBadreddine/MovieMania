const extentions = require('../helper/extensions.js')
const userSchema = require('../models/userSchema')
const session = require('express-session')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config({path:'../../.env'})

const {
    adminUserName,
    adminPassword,
    jwtSecret
} = process.env

const loginFunc = async (req, res, next) => {
    
    const user = {
        email: req.body.email,
        password: extentions.hashString(req.body.password)
    }

    if(user.email == adminUserName && user.password == extentions.hashString(adminPassword)){

        jwt.sign({user: user, role: 'admin'}, jwtSecret, (err, token) => {
            res.send(token)
        })
       
    }else{

    let results = await userSchema.find({
        email: user.email,
        password: user.password
    })

    session.currentUserInfo = results
    
    if(results.length == 1){

        jwt.sign({user: user, role: 'user'}, jwtSecret, (err, token) => {
            res.send(token)
        })

    }else{
        res.status(404).send("User Not Found Please try again later")
    }
    
}}

module.exports = {
    loginFunc
}