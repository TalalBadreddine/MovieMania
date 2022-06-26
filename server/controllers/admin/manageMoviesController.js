const mongoose = require('mongoose');
const movieModel = require('../../models/movieModel.js')


// GET request for one movie (specified by its ID)
const getMovie = async (req, res) => {
    try{

        const id= req.params.id;
        console.log(id);

        const movie= await movieModel.find({
             _id:id
        },
        // {title:1
    );
        if(movie){
            res.status(200).json(movie);
        }
        else{
            res.status(404).json({message:"movie not found"})
        }


        

    }
    catch(error){
        console.log(error)
        res.status(500).json({message: "internal error"})
    }
}



// GET request for a list of all movies
const getMovies = async (req, res) => {
    try{
        // res.send("get movies routes")
        const adult =req.query.adult;
        const backdrop_path=req.query.backdrop_path;
        const belongs_to_collection =req.query.belongs_to_collection;
        const budget=req.query.budget;
        
        const projection = {
            adult: 1, 
            backdrop_path: 1,
            belongs_to_collection: 1,
            budget:1
        }

        // const filters={
        //     maker: maker
        // }
        // const filters = {}

        // if(adult){
        //     filters.adult=adult
        // }

        const filters = {}
        adult && (filters.adult = adult)
        backdrop_path && (filters.backdrop_path = backdrop_path)
        belongs_to_collection && (filters.belongs_to_collection = belongs_to_collection)
        
        const movies= await movieModel.find(filters, projection);
        //    const movies= await movieModel.find();
    
        if(movies){
            res.status(200).json(movies);
        }

    }
    catch(error){
        res.status(500).json({message: "internal error"})
    }
}



// POST request to add a movie
const addMovie = async (req, res) => {
        // console.log(req.body);
        const moviesAdded = new movieModel({
        //  adult: req.query.adult,
         title: req.body.title,
        //  genres: req.query.genres,
         budget: req.body.budget

            })
    try{
        const newAddMovie = await moviesAdded.save()
        res.json (newAddMovie)
        console.log('Movie ADDED!')

    } catch(error){
        res.send("Error" + error)
        console.log(error)
    }
}


//START ANOTHER METHOD TO POST MOVIE


        // try{
    //     const addMovie = req.body;
    //     console.log(addMovie)
    //      const result= await movieModel.create(addMovie);

    //     console.log(result)
    //     if(result){
    //         res.status(201).json({message: "Movie Added"});
    //     }
    //     else{
    //         res.status(404).json({message:"failed to add movie! Movie not found"});
    //     }
     
    // }catch(error){
    //     console.log(error)
    //     res.status(500).json({message: "internal error"})
    // }

//END ANOTHER METHOD TO POST MOVIE



// PUT  PATCH request to update a movie
const updateMovie = async (req, res) => {
    try{
        const moviesUpdate = await movieModel.findById(req.params.id)
        moviesUpdate.budget = req.body.budget
        const newUpdateMovie = await moviesUpdate.save()
        res.json(newUpdateMovie)
        console.log("Movie UPDATED !")
    }catch(error){
        console.log(error)
         res.status(409).json.message({message:error.message});
    }
}

//START ANOTHER METHOD TO UPDATE MOVIE

    // try{
    //     const moviesUpdate = req.body;
    //     const id = req.params.id;
    //     const result = await movieModel.updateOne(moviesUpdate);

    //     if(result){
    //         res.status(201).json({message : "updated movie"});
    //     }
    //     else{
    //         res.status(409).json({message : "failed to update movie"});

    //     }
    // }catch (error){
    //     res.status (500).json({message : "internal error"});

    // }

//END ANOTHER METHOD TO UPDATE MOVIE

 
    

// DELETE request to delete a movie
const deleteMovie = async (req, res) => {
    try{
        const deleteMovie = await movieModel.findById(req.params.id)
        // moviesDelete.title = req.body.title
        const newDeleteMovie = await deleteMovie.remove()
        res.json(newDeleteMovie);
        console.log("Movie DELETED !")

// ANOTHER METHOD TO DELETE MOVIE

        // const id = req.params.id;
        // const result = await movieModel.deleteOne({ _id:id })

    }catch(error){
        console.log(error)
        res.status(500).json({message:"error"});
    }

}

module.exports = {
    getMovie,
    getMovies,
    addMovie,
    updateMovie,
    deleteMovie
}