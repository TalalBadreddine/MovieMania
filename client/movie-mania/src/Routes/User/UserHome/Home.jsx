import React from 'react'
import Main from '../../../Components/Main/Main'
import Row from '../../../Components/Rows/Row'
import requests from '../../../Request'
import SearchBar from '../../../Components/searchBar/SearchBar'
import Filter from '../../../Components/filters/Filter'
import styles from './Homecss.module.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Loading from '../../../Components/Loading/Loading'
import {useNavigate} from 'react-router-dom'

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [movie, setMovie] = useState();
  const [animation, setAnimation] = useState([])
  const [comedy, setComedy] = useState([])
  const [action, setAction] = useState([])

  const navigate = useNavigate()

  useEffect(() => {async function fetchMovie(){
        
    await axios.get('/user/Movies')
    .then(async (response) => { 

        response.data == 'forbidden' && navigate('/')
        
        for(let i = 0 ; i < response.data.length ; i++){
          let currentMovie = response.data[i]
          let genresOfMovie = currentMovie.genres.map((genre) => genre.name)

          if(genresOfMovie.includes('Animation')){ 
            let dummy = animation
            dummy.push(currentMovie)
            setAnimation(dummy)
          }

          else if(genresOfMovie.includes('Comedy')){
            let dummy = comedy
            dummy.push(currentMovie)
            setComedy(dummy)
          }

          else if(genresOfMovie.includes('Action')){
            let dummy = action
            dummy.push(currentMovie)
            setAction(dummy)
          }

   
        }

         setMovies(response.data)
         setMovie(response.data[Math.floor(Math.random() * 20)])

    })
    .catch((err) => {
      if(err){
        console.log(err)
      }
    })

  }

    fetchMovie();
}, [])

if(movie == undefined ){

  return <Loading></Loading>
}

  return (
    <div className={styles.pageContent}>
        {<Main movies = {movies} movie = {movie} />}
        <SearchBar /> 
        <br />
        <div className='flex'>
            <div className='ml-5'>
            <Filter />
            </div>
            <br />
            <div className='ml-5'>

            {/* <Row title='Top Rated'  fetchURL={requests.requestTopRated}/>
            <Row title='Horror'  fetchURL={requests.requestHorror} />
            <Row title='Trending'  fetchURL={requests.requestTrending}/> */}

            <Row title='Animation' moviesArr={animation}/>
            <Row title='Comedy' moviesArr={action} />
            <Row title='Action' moviesArr={comedy}/>
            <Row title='All Movies' moviesArr={movies}/>

            </div>
        </div>
        
    </div>
  )
}

export default Home