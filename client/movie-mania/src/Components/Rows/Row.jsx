import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Movies from '../Movie/Movies';


const Row = ({ title, fetchURL}) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get(fetchURL).then((response) => {
      setMovies(response.data.results.slice(0, 6));
    });
  }, [fetchURL]);


  return (
    <>
      <h2 className='text-white font-bold md:text-xl p-4'>{title}</h2>
       <div className='relative flex items-center group'>
        <div id={'slider'} 
         
        >
            {movies.map((item, id) => (
                <Movies key={id} item={item}/>
            ))}
        </div>
        </div> 
    </>
  );
};

export default Row;