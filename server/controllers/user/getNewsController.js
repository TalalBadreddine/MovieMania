const extensions = require('./../../helper/extensions.js')
const axios = require("axios");
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const session = require('express-session')
const NewsSchema = require('../../models/newsSchema');
const newsSchema = require('../../models/newsSchema');
const movieSchema = require('../../models/movieSchema')

dotenv.config({path: __dirname + '/../../../.env'})

const {
    backdropPath,
    movieApi,
    apiKey
} = process.env


const getAllUpcomingMovies = async (req, res) => {

    try{

        let dataBaseIsEmpty 

        await extensions.dbIsEmpty(newsSchema).then( async (response) => {
            dataBaseIsEmpty = response
        })

        if(!extensions.sessionHaveMovies()  && dataBaseIsEmpty ){
           
            let listOfAllUpcomingMoviesDetails = []
            await extensions.getUpcomingMovies().then(async (results) => {

                for(let i = 0 ; i < results.length ; i++){
                    
                    let currentMovieId = results[i]
                    
                   await  extensions.getUpcomingMovieDetailById(currentMovieId).then(async (movieDetails) => {
                        await extensions.addToDb(newsSchema, movieDetails)
                        listOfAllUpcomingMoviesDetails.push(movieDetails)
                    })
                    

                }
                console.log(listOfAllUpcomingMoviesDetails[0])
            })

            res.send(listOfAllUpcomingMoviesDetails)
            session.currentUserMovies = listOfAllUpcomingMoviesDetails
           
        }else{

            if(!extensions.sessionHaveMovies()){
                console.log("No new News")
                extensions.getAllDetailsFromDb(newsSchema).then( (results) => {
                session.currentUserMovies = results
                res.send(results)
               })

            }else{
                console.log("session have The Upcoming Movies News")
                res.send(session.currentUserMovies)
            }
        }
      }catch(err){
        console.log(err.message)
    }
}

        


    


const getUpcomingMoviesByGenre = async (req , res) => {

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

 async function upComing (req, res){ 
    
    try{ 
        if(extensions.sessionHaveUpcomingMovies()){ 
            res.send(session.currentUserUpcomingMovies)
        } else { 
            extensions.dbIsEmpty(newsSchema).then(async (resp) =>{
                let dbIsEmpty = resp
                
                if(dbIsEmpty){ 
                     let data 
                     await extensions.getUpcomingMovies().then(async (resp) => { 
                            data = resp.data["results"]
                            let allUpcomingMovies = []
                            for(let i=0; i < data.length; i++){ 
                                allUpcomingMovies.push(data[i])

                                await extensions.addToDb(NewsSchema, data[i])
                                
                            }
                            session.currentUserUpcomingMovies = allUpcomingMovies
                     })
                        res.json(data)
                }else{ 
                        console.log("session don't have the Upcomingmovies")
                        extensions.getAllDetailsFromDb(newsSchema).then( (results) => {
                        session.currentUserUpcomingMovies = results
                        res.send(results)
                       })
                }

             })
        } 
    }catch(error){ 
        res.status(500).json({message: "Inernal Error"})
        console.log(error)
    }
    
    
}
        const moviesYouMayLike = async (req, res) => { 
            await extensions.getThisMonthEnrolledMovies(session.currentUserInfo.email).then( async (resp)=>{
             let moviesYouMayLike = resp
             let subscribedMovies = []
            for(let i=0;i < moviesYouMayLike.length; i++){

            //  moviesYouMayLikeId.push(moviesYouMayLike[i])  

             let movieIdFind = await  movieSchema.find({
                'id': moviesYouMayLike[i]
            },{
                genres:1,
                _id: 0
            });
            
            for(let i=0; i < movieIdFind.length;i++){
                // console.log(movieIdFind[i].genres)
                for(let j = 0 ; j < movieIdFind[i].genres.length ; j++){
                    // console.log(movieIdFind[i].genres[j].name)
                    let movieGenre = movieIdFind[i].genres[j].name
                    // console.log(movieGenre)
                    let allGenre = new Map();
                    for(let k = 0; k < movieGenre.length; k++){
                        if(allGenre.has(movieGenre[k])){
                            allGenre.set(movieGenre[k], allMovies.get(movieGenre[k]) + 1)
                        }else{
                            console.log(movieGenre[k])
                            allGenre.set(movieGenre[k], 1)
                        }
                        return allGenre
                        console.log(allGenre)
                    }
                }
             }
            subscribedMovies.push(movieIdFind)
            // console.log(typeof subscribedMovies)
                
            }
            });
}


module.exports = {
    getAllUpcomingMovies, 
    getUpcomingMoviesByGenre, 
    moviesYouMayLike,
    upComing}