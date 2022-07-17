import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import requests from '../../Request';
import { FaPlay } from 'react-icons/fa';
import {AiOutlineInfoCircle} from 'react-icons/ai'

const Main = () => {
    const [movies, setMovies] = useState([]);
    const [movie, setMovie] = useState([]);

    useEffect(() => {async function fetchMovie(){
        
        axios.get('/user/Movies')
        .then((response) => { 
             setMovies(response.data)
            setMovie(response.data[0])
            console.log(response.data)
        })}
        fetchMovie();
    }, [])
    



    
    

  return (
    <div className='w-full h-[550px] text-white'>
        <div className='w-full h-full'>
            <div className='absolute w-96 h-[550px] bg-gradient-to-r from-black'></div>
           {movie!=undefined && <img className='w-full h-full object-cover' src={`https://image.tmdb.org/t/p/w1280/${movie?.backdrop_path}`} alt={movie?.title} />}
            <div className='absolute w-100 top-[50%] ml-5 p-4 md:p-8'>
            <h1 className='text-4xl md:text-5xl font-bold'>
                {movie?.title}</h1>
            <div className='my-4' >
                <button className='border bg-white opacity-90 text-black  border-gray-300 py-2 px-5'><FaPlay className='inline-block mr-3'/>Play</button>
                <button className='border bg-white opacity-80 text-black border-gray-300 py-2 px-5 ml-4'><AiOutlineInfoCircle className='inline-block mr-1 text-xl'/>More Info</button>
            </div>
            </div>
        </div>
    </div>
  )
}

export default Main