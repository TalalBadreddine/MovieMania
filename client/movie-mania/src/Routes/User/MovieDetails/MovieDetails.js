import axios from "axios"
import { useEffect } from "react"

const MovieDetail = (props) => {
    const {movieId} = props
    
    useEffect(() => {
        axios.post('/user/Movies',{
            movieId: movieId
        })
        .then((data) => {
            console.log(data.data)
        })
    })

    return(
        <h1>test movie details</h1>
    )
}

export default MovieDetail