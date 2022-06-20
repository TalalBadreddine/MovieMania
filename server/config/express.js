//import packages library
const express = require('express')
const moviesRouter = require('../routes/adminRoute/movieRoute.js');
const dotenv = require('dotenv')
const mongoose = require('mongoose')


 const app = express()

dotenv.config({path: __dirname + '/../../.env'})

const {
    dbPort,
    dbHost,
    dbName,
    serverPort
} = process.env

async function connectDB(){
    // mongodb://localhost:27017/MovieMania
    const uri = `mongodb://${dbHost}:${dbPort}/${dbName}`
    await mongoose.connect(uri)
    console.log("Connected to db!")
}

async function startServer(){
    try{
        await connectDB()

        // intialize express app
        const app = express()

        app.use(express.json())

        // Insert Routest here
         // initialize routes
         app.use('/admin/movies', moviesRouter); 

         // start listening for requests
        app.listen(serverPort, () => console.log(`Listening to port ${serverPort}`))

    }catch(error){
       
        console.log(`Error at server connection with Db : ${error.message}`)
    }
}
startServer()


