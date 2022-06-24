const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config({path:'../../.env'})

const {
    jwtSecret
} = process.env

const validateUser = (req, res, next) => {
    const token = req.cookies.jwt

    if(token){
        jwt.verify(token, jwtSecret, async (err, decodedToken) => {
            if(err){

                console.log(err.message);
                res.redirect('/login');

            }else{
                
                let role = decodedToken['role']
                role == "user" ? next() : res.status(401)

            }
        })

    }else{
        res.redirect('/login')
    }
}

const validateAdmin = (req, res, next) => {
    const token = req.cookies.jwt

    if(token){
        jwt.verify(token, jwtSecret, async (err, decodedToken) => {
            if(err){

                console.log(err.message);
                res.redirect('/login');

            }else{
                
                let role = decodedToken['role']
                role == "admin" ? next() : res.send("cannot go in")

            }
        })

    }else{
        res.redirect('/login')
    }
}

// const validateAdmin = (req, res, next)

module.exports = {
    validateUser,
    validateAdmin
}