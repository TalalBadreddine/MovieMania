const mongoose = require('mongoose');
const userSchema = require('../../models/userSchema.js')
const moviesSchema = require('../../models/movieSchema.js')
const extensions = require('../../helper/extensions.js')
const session = require('express-session')

const getAllMoviesFromDB = async (req, res) => {

    try {

        if (!extensions.sessionHaveMovies()) {

            console.log("session don't have the movies")
            extensions.getAllDetailsFromDb(moviesSchema).then((results) => {

                session.currentUserMovies = results
                res.send(session.currentUserMovies)
               
            })

        } else {
            console.log("session have the movies")
            res.send(session.currentUserMovies)
        }
    } catch (err) {
        console.log(err.message)
    }
}

const getUserLikedMoviesFromDB = async (req, res) => {

    try {

        let moviesId = []
        let likedMoviesArray = []
        let unlikedMoviesArray = []
        let moviesCount = await moviesSchema.count()
        let j = 0
        let k=0
        const userId = req.params.userId;

        if (!extensions.sessionHaveLikedMovies()) {

            console.log("session don't have the user liked movies")
            const liked = await userSchema.find({ _id: userId })
            const movies = await moviesSchema.find()

            for (let i = 0; i < moviesCount; i++) {

                moviesId[i] = movies[i]._id

            }

             likedMoviesArray = liked[0].likedMovies
             unlikedMoviesArray = moviesId.filter(f => !likedMoviesArray.includes(f));
            
            session.currentUserLikedMovies = likedMoviesArray
            session.currentUserUnLikedMovies = unlikedMoviesArray
            res.send( session.currentUserLikedMovies)
            
        } else {

            res.send(session.currentUserLikedMovies)

        }
    } catch (err) {
        console.log(err.message)
    }
}

const addLikedMovie = async (req, res) => {
    try {

        const userId = req.params.userId;
        const movieId = req.params.movieId;
        const currentUser = await userSchema.findById(userId);
        session.currentUserInfo = currentUser;
        const likeAddedToDb = await userSchema.updateOne({ _id: userId }, { $push: { likedMovies: movieId } });
        const likeAddedToSession = await session.currentUserInfo.likedMovies.push(movieId)

        console.log(session.currentUserInfo.likedMovies)

    } catch (error) {
        res.status(500).json({ message: "internal error" });
    }
}

const removeLikedMovie = async (req, res) => {
    try {

        const userId = req.params.userId;
        const movieId = req.params.movieId;
        const likeRemovedFromDb = await userSchema.updateOne({ _id: userId }, { $pull: { likedMovies: movieId } });
        const likeRemovedFromSession = await session.currentUserInfo.likedMovies.pull(movieId)

        console.log(session.currentUserInfo.likedMovies)

    } catch (error) {
        res.status(500).json({ message: "internal error" });
    }
}

module.exports = {
    addLikedMovie,
    removeLikedMovie,
    getAllMoviesFromDB,
    getUserLikedMoviesFromDB
}