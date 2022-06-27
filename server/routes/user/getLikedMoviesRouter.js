const {
    addLikedMovie,
    removeLikedMovie,
    getAllMoviesFromDB,
    getUserLikedMoviesFromDB
} = require('../../controllers/user/getLikedMoviesController.js')

const Router = require('express').Router;
const likedMoviesRouter = Router();


likedMoviesRouter.put('/:userId/:movieId/addLike',addLikedMovie);


likedMoviesRouter.put('/:userId/:movieId/removeLike',removeLikedMovie)


likedMoviesRouter.get('/session/movies',getAllMoviesFromDB)


likedMoviesRouter.get('/:userId/likedMovies',getUserLikedMoviesFromDB)

module.exports = likedMoviesRouter;