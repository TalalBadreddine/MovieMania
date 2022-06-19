const extentions = require('../helper/extensions.js')
const userSchema = require('../models/userSchema')
const session = require('express-session')
const dotenv = require('dotenv')

dotenv.config({path:'../../.env'})

const {
    adminUserName,
    adminPassword
} = process.env

const loginFunc = async (req, res) => {

    const user = {
        email: req.body.email,
        password: extentions.hashString(req.body.password)
    }

    if(user.email == adminUserName && user.password == adminPassword){
        res.send("Admin")
    }

    let results = await userSchema.find({
        email: user.email,
        password: user.password
    })

    session.currentUserInfo = results

    results = results.length
    
    if(results <= 1){
        let message = results == 1 ? "Signed In successfully" : "user not found"
        res.send(message)

    }else{
        results > 1 && res.send("Somthing is wrong")
        res.status(404).send("User Not Found Please try again later")
    }
    
}

module.exports = {
    loginFunc
}