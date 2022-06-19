const {
    getAllMovies,
    getMoviesByGenre
 } = require('../../controllers/user/getMoviesController.js')

const router = require('express').Router

const moviesRouter = router()

moviesRouter.get('/', getAllMovies)

moviesRouter.post('/', getMoviesByGenre)

module.exports = moviesRouter