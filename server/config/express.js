const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const getMoviesRouter = require('../routes/user/geMoviesRouter.js')
const session = require('express-session')
const app = express()
const manageUsersRouter = require('../routes/admin/manageUsersRoute.js');

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

        app.use('/admin/manageUsers', manageUsersRouter)


        // Insert Routest here

        app.use('/user/Movies', getMoviesRouter)

        app.listen(serverPort, () => console.log(`Listening to port ${serverPort}`))

    }catch(error){
       
        console.log(`Error at server connection with Db : ${error.message}`)
    }
}
startServer()