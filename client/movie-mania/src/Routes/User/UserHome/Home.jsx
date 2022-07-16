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

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [movie, setMovie] = useState();

  useEffect(() => {async function fetchMovie(){
        
    axios.get('/user/Movies')
    .then((response) => { 
         setMovies(response.data)
         setMovie(response.data[Math.floor(Math.random() * 20)])

    })
    .catch((err) => {
      console.log(err)
    })
  }
    fetchMovie();
}, [])

if(movie == undefined){
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
            <Row title='Top Rated'  fetchURL={requests.requestTopRated}/>
            <Row title='Horror'  fetchURL={requests.requestHorror}/>
            <Row title='Trending'  fetchURL={requests.requestTrending}/>
            </div>
        </div>
        
    </div>
  )
}

export default Home