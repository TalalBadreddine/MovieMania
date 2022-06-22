const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const session = require('express-session')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser');
const extensions = require('../helper/extensions.js')
const path = require('path')
const app = express()
const userRegisterRouter = require('../routes/user/register.js')
const getMoviesRouter = require('../routes/user/getMoviesRouter.js')
const manageUsersRouter = require('../routes/admin/manageUsersRoute.js');
const  loginRouter = require('../routes/loginRoute.js')
const {validateUser,validateAdmin } = require('../middleware/authMiddleware.js')

dotenv.config({path: __dirname + '/../../.env'})

const {
    dbPort,
    dbHost,
    dbName,
    serverPort,
    sessionSecret,
    jwtSecret
} = process.env

async function connectDB(){
    const uri = `mongodb://${dbHost}:${dbPort}/${dbName}`
    await mongoose.connect(uri)
    console.log("Connected to db!")
}

async function startServer(){
    try{
        await connectDB()

        const app = express()

        app.use(cookieParser())

        app.use(express.json())

        app.set('views', path.join(__dirname, '/../views/'))

        app.set('view engine', 'ejs')

        app.use(session({
            secret: sessionSecret,
            resave: false,
            saveUninitialized: false
        }))

        // Insert Routest here

        app.get('/success', (req, res) => {
            res.render('success.ejs')
        })

        app.get('/cancel', (req, res) => {
            res.render('cancel.ejs')
        })

        app.use('/login', loginRouter)

        app.use('/register', userRegisterRouter)

        app.use('/user/Movies', validateUser, getMoviesRouter)

        app.use('/admin/manageUsers', validateAdmin, manageUsersRouter)

        app.listen(serverPort, () => console.log(`Listening to port ${serverPort}`))

    }catch(error){
       
        console.log(`Error at server connection with Db : ${error.message}`)
    }
}


startServer()