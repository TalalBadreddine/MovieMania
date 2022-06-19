const session = require('express-session')
const userSchema = require('../models/userSchema.js')
const axios = require('axios')
const dotenv = require('dotenv')
const crypto = require('crypto');
const hashType = 'sha1'
const encodeAs = 'hex'

dotenv.config({path: __dirname + '/../.env'})

const {
    backdropPath,
    movieApi,
    apiKey
} = process.env


// <-------- JWT -------->


function verifyTokenForUser(req, res, next) {
    
    const bearerHeader = req.headers['authorization'];
 
    if(typeof bearerHeader !== 'undefined') {

      const bearer = bearerHeader.split(' ');

      const bearerToken = bearer[1];

      req.token = bearerToken;

     
      jwt.verify(req.token, jwtSecret, (err, authData) => {
        let role = authData['role']
        role == 'user' ? next() : res.end()
      })

    } else {

      res.sendStatus(403);
    }  
}
 

// <-------- String -------->


function hashString(str){
    try{
        const hash = crypto.createHash(hashType).update(str).digest(encodeAs);
        return hash
    }
    catch(err){
        console.log(err.message)
    }
}


// <-------- Session -------->


function sessionHaveMovies(){
    try{
        const results = session.currentUserMovies
        return results != undefined
    }
    catch(err){
        console.log(err.message)
        return false
    }
}


// <-------- API -------->


async function getAllMoviesId(){
    let moviesId = []

    for(let i = 0 ; i < 5 ;i++){
        const getAllMovies = {
            method: 'GET',
            url: `${movieApi}discover/movie?api_key=${apiKey}&page=${i+1}`,
                headers: {
                    'X-RapidAPI-Key': 'b430c9dc9cmsh98401db1637b694p116976jsnfaeb2c0dc52d',
                    'X-RapidAPI-Host': 'movies-app1.p.rapidapi.com' 
                }   
         }
        await axios.request(getAllMovies).then(function (response){
            let data = response.data['results']
    
            for(let i = 0 ; i < data.length ; i++){
                moviesId.push(data[i]['id'])
            }
        })    
    }
    return moviesId
}


async function getMovieDetailById(id){
    let results 

    try{
        const reponse = await axios.get(`${movieApi}/movie/${id}`, {
             params: {
            api_key: apiKey,
            append_to_response: "videos"
         }})

         return reponse.data
    }
    catch(err){

        console.log(err.message)

    }
    return results
}


// <-------- DataBase -------->


async function userAlreadyExist(email){
    try{
        const results = await userSchema.find({
            email: email
        }).count()
        
        return results != 0 
    }
    catch(err){
        console.log(err.message)
    }
}


async function getBundleForUserById(userId){
    try{
        const results = userSchema.find({
            _id: userId
        },{
            bundlesId: 1
        })

        return results[results.length - 1]
    }
    catch(error){
        console.log(error.message)
    }
}


async function addToDb(modelName, modelInfo){
    try{
        let element = new modelName(modelInfo)
        await element.save()
    }
    catch (err){
        console.log(err.message)
    }
}


async function getAllDetailsFromDb(modelName){
    try{
        const results = await modelName.find()
        return results
    }
    catch(err){
        console.log(err.message)
    }
}


async function dbIsEmpty(SchemaName){

    try{
        const results = await SchemaName.find().count()
        return results == 0
    }
    catch(err){

        console.log(err.message)
    }

    return 1
}


module.exports = {
    sessionHaveMovies,
    dbIsEmpty,
    getAllMoviesId,
    getMovieDetailById,
    addToDb,
    getAllDetailsFromDb,
    getBundleForUserById,
    userAlreadyExist,
    hashString  
}