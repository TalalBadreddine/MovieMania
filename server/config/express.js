//import packages library
const express = require('express')
const moviesRouter = require('../routes/adminRoute/movieRoute.js');
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const session = require('express-session')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser');
const extensions = require('../helper/extensions.js')
const bundleRouter = require('../routes/bundleRoute')
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

        // intialize express app
        const app = express()

        app.use(cookieParser())

        app.use(express.json())

        app.use(session({
            secret: sessionSecret,
            resave: false,
            saveUninitialized: false
        }))

        // Insert Routest here

        
         app.use('/admin/bundle', bundleRouter)
      
         // initialize routes
         app.use('/admin/movies', moviesRouter); 

        app.use('/login', loginRouter)

        app.use('/register', userRegisterRouter)

        app.use('/user/Movies', validateUser, getMoviesRouter)

        app.use('/admin/manageUsers', validateAdmin, manageUsersRouter)

        app.listen(serverPort, () => console.log(`Listening to port ${serverPort}`))

    }catch(error){
       
        console.log(`Error server connection with Db : ${error.message}`)
    }
}

startServer()