import { useEffect, useState } from 'react'
import styles from './MyMoviesCss.module.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Movies from '../../../Components/Movie/Movies';
import Loading from '../../../Components/Loading/Loading'


const MyMovies = () => {

    const navigate = useNavigate()
    const [likedMovies, setLikedMovies] = useState()
    const [enrolledMovies, setEnrolledMovies] = useState()
    const [filteredEnrolledMovies, setFilteredEnrolledMovies] = useState()

    useEffect(() => {
        const fetchMoviesLiked = () => {
            axios.get('/user/likedMovies')
            .then((data) => {
                let resp = data.data
                console.log(resp)
                resp == 'forbidden' && navigate('/')
                setLikedMovies(resp)
            })
        }

        fetchMoviesLiked()
    },[])

    useEffect(() => {
        const fetchEnrolledMovies = () => {
            axios.get('/user/Movies/subscribed')
            .then(data => {
                let resp = data.data
                setEnrolledMovies(resp)
            })
        }
        fetchEnrolledMovies()
    }, [])

    if(likedMovies == undefined || enrolledMovies == undefined){
        return(<Loading></Loading>)
    }

    return(
        <div className={[styles.allPage, ' w-full h-full text-white pt-20'].join('')}>
            <div className='p-10'>
                <h1 className='text-3xl mb-3'>My Liked Movies</h1>
                {likedMovies && likedMovies.map((movie, index) => {
                    return (
                        <Movies key={index} item={movie} />
                    )
                }) }
            </div>

            <div className='p-10'>
                 <h1 className='text-3xl mb-3'>My Enrolled Movies</h1>
                {enrolledMovies && enrolledMovies.map((movie, index) => {
                    return(
                          <Movies key={index} item={movie} />
                    )
                }) }
            </div>
            
        </div>
    )
}
export default MyMovies