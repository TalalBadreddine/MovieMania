const extensions = require('./../../helper/extensions.js')
const axios = require("axios");
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const session = require('express-session')
const moviesSchema = require('../../models/movieSchema.js')

dotenv.config({path: __dirname + '/../../../.env'})

const {
    backdropPath,
    movieApi,
    apiKey
} = process.env


const getAllMovies = async (req, res) => {

    try{

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

module.exports = {getAllMovies, getMoviesByGenre}