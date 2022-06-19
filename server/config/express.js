const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const session = require('express-session')
const app = express()
const userRegisterRouter = require('../routes/user/register.js')
const getMoviesRouter = require('../routes/user/getMoviesRouter.js')
const manageUsersRouter = require('../routes/admin/manageUsersRoute.js');
const  loginRouter = require('../routes/loginRoute.js')

dotenv.config({path: __dirname + '/../../.env'})

const {
    dbPort,
    dbHost,
    dbName,
    serverPort,
    sessionSecret
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
        
        app.use(express.json())

        app.use(session({
            secret: sessionSecret,
            resave: false,
            saveUninitialized: false
        }))

        // Insert Routest here

        app.use('/login', loginRouter)

        app.use('/register', userRegisterRouter)

        app.use('/user/Movies', getMoviesRouter)

        app.use('/admin/manageUsers', manageUsersRouter)

        app.listen(serverPort, () => console.log(`Listening to port ${serverPort}`))

    }catch(error){
       
        console.log(`Error at server connection with Db : ${error.message}`)
    }
}
startServer()