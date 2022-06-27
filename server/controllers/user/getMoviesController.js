const extensions = require('./../../helper/extensions.js')
const axios = require("axios");
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const session = require('express-session')
const moviesSchema = require('../../models/movieSchema.js');
const userSchema = require('../../models/userSchema.js');
const manageBundlesAndUsersSchema = require('../../models/manageBundlesAndUsersSchema.js');
const { response } = require('express');

dotenv.config({path: __dirname + '/../../../.env'})

const {
    backdropPath,
    movieApi,
    apiKey
} = process.env


const getAllMovies = async (req, res) => {

    try{ 
        let availbleBundles

        await extensions.getUserThisMonthBundles(session.currentUserInfo.email).then( (response) => {
            availbleBundles = response
        })

        if(availbleBundles.length <= 0){
            // redirect
            return res.status(403).json("You need to subscribe to new Bundle")
        }
        
        let dataBaseIsEmpty 

        await extensions.dbIsEmpty(moviesSchema).then( async (response) => {
            dataBaseIsEmpty = response
        })

        if(!extensions.sessionHaveMovies()  && dataBaseIsEmpty ){
           
            let listOfAllMoviesDetails = []
            await extensions.getAllMoviesId().then(async (results) => {

                for(let i = 0 ; i < results.length ; i++){
                    
                    let currentMovieId = results[i]
                    
                   await  extensions.getMovieDetailById(currentMovieId).then(async (movieDetails) => {
                        await extensions.addToDb(moviesSchema, movieDetails)
                        listOfAllMoviesDetails.push(movieDetails)
                    })
                    

                }
                console.log(listOfAllMoviesDetails[0])
            })

            res.send(listOfAllMoviesDetails)
            session.currentUserMovies = listOfAllMoviesDetails
           
        }else{

            if(!extensions.sessionHaveMovies()){
                console.log("session don't have the movies")
                extensions.getAllDetailsFromDb(moviesSchema).then( (results) => {
                session.currentUserMovies = results
                res.send(results)
               })

            }else{
                console.log("session have the movies")
                res.send(session.currentUserMovies)
            }
        }
      }catch(err){
        console.log(err.message)
    }
}


const getMoviesByGenre = async (req , res) => {

    try {

        const genre = req.query.genre
        let allMovies = session.currentUserMovies
        let filteredMovies = []

        for(let i = 0 ; i < allMovies.length ; i++) {
            let currentMovieGenres = allMovies[i]['genres']
            
            for(let j = 0 ; j < currentMovieGenres.length ; j++){
                if(currentMovieGenres[j]['name'].toLowerCase() == genre){
                    filteredMovies.push(allMovies[i])
                    break
                }
            }
        }
        res.send(filteredMovies)
    }
    catch(error){
        console.log(error.message)
    }
}

const likeMovieById = async(req, res) => {

    try{

        const movieId = req.query.movieId
        let userInfo = session.currentUserInfo
        let userLikedMovies = userInfo.likedMovies
        let movieIsAlreadyLiked = userLikedMovies.includes(movieId)

        if(movieIsAlreadyLiked){

            userLikedMovies = userLikedMovies.filter( (currentMovieId) => currentMovieId != movieId)
            console.log(`like Removed for movieId => ${movieId}`)

        }else{

            userLikedMovies.push(movieId)
            console.log(`like added for movieId => ${movieId}`)

        }

        userInfo.likedMovies = userLikedMovies
        session.userInfo = userInfo

        await userSchema.updateOne({
            _id: userInfo._id
        },{
            $set: {
                likedMovies: userLikedMovies
            }
        })

        res.status(200).json("Done")
    }
    catch(err){
        console.log(err.message)
    }
}


const subscribeToMovieById = async (req, res) => {
    try{      
  
        const movieId = req.query.movieId
        let userInfo = session.currentUserInfo
        let nonOverLimitBundles 
        let allSubscribedMovies = []    

        await extensions.getThisMonthEnrolledMovies(userInfo.email).then( (response) => {
            allSubscribedMovies = response
        })

        await extensions.getUserCurrentMonthBundlesWithNonOverLimitMovies(userInfo.email).then( (response) => {
            nonOverLimitBundles = response
           
        })


        if(nonOverLimitBundles.length == 0){
            return res.json("You can't subscribe to movies, your bundle limit is full")
        }
  
        let userEnrolledMovies = nonOverLimitBundles[0].enrolledMoviesId
        let movieIsAlreadyEnrolled = allSubscribedMovies.includes(movieId)
       
        if(movieIsAlreadyEnrolled){
            
            return res.status(200).json("Movies Already Enrolled")

        }else{

            userEnrolledMovies.push(movieId)
            console.log(`Enrolled Movie added => ${movieId}`)

        }


        await manageBundlesAndUsersSchema.updateOne({
            userId: userInfo._id
        },{
            $set: {
                enrolledMoviesId: userEnrolledMovies
            },
            $inc: { numberOfMoviesLeft: -1 }
        })

        res.status(200).json("Done")
    }
    catch(err){
        console.log(err.message)
    }
}

module.exports = {getAllMovies, getMoviesByGenre, likeMovieById, subscribeToMovieById}