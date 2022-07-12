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
                // return res.redirect('http://localhost:3000/login');
                return res.status(500).json("Error with the server")

            }else{
                
                let role = decodedToken['role']
                role == "user" ? next() : res.send('cannot go in')

            }
        })

    }else{
        // return res.redirect('http://localhost:3000/login')
        return res.status(403).json("forbidden")
    }
}


const validateAdmin = (req, res, next) => {
    const token = req.cookies.jwt

    if(token){
        jwt.verify(token, jwtSecret, async (err, decodedToken) => {
            if(err){

                console.log(err.message);
                // return res.redirect('/login');
                return res.status(500).json("Error with the server")


            }else{
                let role = decodedToken['role']
                role == "admin" ? next() : res.send("cannot go in")

            }
        })

    }else{
        // return res.redirect('/login')
        return res.status(403).json("forbidden")
    }
}


module.exports = {
    validateUser,
    validateAdmin
}