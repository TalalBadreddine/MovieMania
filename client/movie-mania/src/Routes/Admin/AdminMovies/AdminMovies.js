import { useState, useEffect } from 'react'
import axios from 'axios'
import Notification from '../../../Components/Notification/Notification'
import { useNavigate } from 'react-router-dom'
import styles from './AdminMoviesCss.module.css'
import LoadingSVG from '../../../Components/LoadingSvg/LoadingSvg'


let skeletonOfCurrentMovie = {

    title: '',
    genres: '',
    posterPath: '',
    titleOfContainer: 'Add Movie',
    btn: 'Add',
    id: ''

}

let errorSkeleton = {

    title: 'Error',
    content: '',
    hidden: true
}

const AdminMovies = () => {
    const [allMovies, setAllMovies] = useState()
    const [filteredMovies, setFilteredMovies] = useState()
    const [searchInput, setSearchInput] = useState('')
    const [currentMovie, setCurrentMovie] = useState(skeletonOfCurrentMovie)
    const [notificationError, setNotificationError] = useState(errorSkeleton)
 
    useEffect(() => {

        const fetchMovies = async () => {

            await axios.get('/admin/movies')
                .then((data) => {
                    let movies = data.data
                    setAllMovies(movies)
                    setFilteredMovies(movies)
                })
        }

        fetchMovies()

    }, [])

    // const handleBtnClick = (event) => {
    //     let idValue = event.target.id
    //     console.log(idValue)
    //     // console.log(event.target.value)
    // }

    const handleSearch = (event) => {
        let searchValue = event.target.value
        setSearchInput(searchValue)

    }

    useEffect(() => {
        if (searchInput == '') {
            setFilteredMovies(allMovies)
            return
        }
        setFilteredMovies(allMovies.filter((movie) => {
            return movie.title.toLowerCase().includes(searchInput.toLowerCase()) || movie.genres[0].name.toLowerCase().includes(searchInput.toLowerCase())
        }))

    }, [searchInput])


    const handleCurrentBundleChange = (event) => {
        let name = event.target.name
        let value = event.target.value
        setCurrentMovie({ ...currentMovie, [name]: value })
    }

    const handleBtnClick = (event) => {
        let idValue = event.target.id
        let movieName = idValue.split('[]')[1]
        let operationType = idValue.split('[]')[0]


        if(operationType == 'edit'){
            let currentMovieData = allMovies.filter((movie) => {
                return movie.title.toLowerCase() == movieName.toLowerCase()
            })
            currentMovieData = currentMovieData[0]
            setCurrentMovie({...currentMovie, ['title']: currentMovieData.title, ['genres']: currentMovieData.genres[0].name, ['posterPath']: currentMovieData.poster_path, ['btn']: 'Edit', ['titleOfContainer']: 'Edit Movies' })
        }

    }

    const handleAddEditMovieBtn = async () => {
        let operationType = currentMovie.btn
        let currentMovieTitle = currentMovie.title.trim()
        let currentMoviePosterPath = currentMovie.posterPath
        let currentMovieGenre = currentMovie.genres.trim()

        if(!currentMovieTitle || !currentMoviePosterPath || !currentMovieGenre ){
           return  setNotificationError({...notificationError, ['title']: 'Error', ['content']: 'Please fill all the fields to continue', ['hidden']: false})
        }

        let matchingMovies = allMovies.filter((movie) =>  movie.title.toLowerCase() == currentMovieTitle.toLocaleLowerCase() )
        console.log(matchingMovies)
        if(operationType == 'Edit'){

           if(matchingMovies.length == 1 && matchingMovies[0].poster_path != currentMoviePosterPath )return  setNotificationError({...notificationError, ['title']: 'Error', ['content']: 'Movie with the same Title Already Exist', ['hidden']: false})


            
        }else{
            if(matchingMovies.length != 0 && matchingMovies[0].posterPath == currentMoviePosterPath )return  setNotificationError({...notificationError, ['title']: 'Error', ['content']: 'Movie with the same Title Already Exist', ['hidden']: false})
            await axios.post('/admin/movies/add',{
                title: currentMovieTitle,
                posterPath: currentMoviePosterPath,
                genre: currentMovieGenre
            })
            .then((data) => {
                console.log(data)
            })
        }
    }

    const handleAddNewMovie = (event) => {
        setCurrentMovie({...currentMovie, ['title']: '', ['genres']: '', ['posterPath']: '', ['btn']: 'Add' })
    }

    return (
        <div className={['h-screen w-full px-10 py-5 ', styles.allPageContent].join(' ')}>

            <div className=' text-white h-1/6 '>
                <h1 className='text-center text-4xl'>Movies</h1>


            </div>
            <div className=''>
                <div className="flex">
                    <div className=" xl:w-80">
                        <div className="input-group relative flex flex-wrap items-stretch w-full mb-2 rounded">
                            <input type="search" className={["form-control relative flex-auto min-w-0 block w-full px-10 py-1.5 text-base font-normal text-white bg-white bg-clip-padding  rounded transition ease-in-out m-0 focus:text-white  focus:outline-none", styles.searchInput].join(' ')} placeholder="Search" aria-label="Search" aria-describedby="button-addon2" val={searchInput} onChange={handleSearch} />
                            <svg fill="#fff" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 45" className='absolute w-6 -mt-2 ml-2' width="50px" height="50px"><path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z" /></svg>
                            <span className="input-group-text flex items-center px-3 py-1.5 text-base font-normal text-gray-700 text-center whitespace-nowrap rounded" id="basic-addon2">
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className='flex h-3/4'>


                <div className='w-1/2  p-5'>

                    <table className='w-full'>
                        <thead className="flex text-white w-full">
                            <tr className="flex w-full mb-4 pt-4 text-2xl">
                                <th className=" w-1/4">Poster</th>
                                <th className=" w-1/4">Title</th>
                                <th className=" w-1/4">genres</th>
                                <th className=" w-1/4">Action</th>
                            </tr>
                        </thead>
                        <tbody className={[" text-center flex flex-col items-center justify-between overflow-y-scroll w-full text-white text-xl", styles.tableCss].join(' ')}>
                            {filteredMovies != undefined && filteredMovies != ' ' ? filteredMovies.map((movie, index) => {
                                return (

                                    <tr className="flex w-full h-32 mb-8 text-center" key={index}>
                                        <td className="py-2 w-1/4">
                                            <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} width='100px' height={'50px'} />
                                        </td>
                                        <td className="py-2 w-1/4 justify-center">{movie.title}</td>
                                        <td className="py-2 w-1/4">{movie.genres[0].name}</td>
                                        <td className="py-2 w-1/4 font-normal"> <span className='pl-2 pr-6 hover:font-bold hover:cursor-pointer' onClick={handleBtnClick} id={`edit[]${movie.title}`} >Edit</span> <span className='hover:font-bold hover:cursor-pointer' onClick={handleBtnClick} id={`delete[]${movie.title}`} >Delete</span></td>
                                    </tr>


                                )
                            })
                                :
                                <tr className="flex w-full h-32 mb-8 text-center">
                                    <td className="py-2 w-1/4"><LoadingSVG />  </td>
                                    <td className="py-2 w-1/4 justify-center"><LoadingSVG />  </td>
                                    <td className="py-2 w-1/4"><LoadingSVG />  </td>
                                    <td className="py-2 w-1/4"><LoadingSVG />  </td>
                                </tr>
                            }

                        </tbody>
                    </table>

                </div>


                <div className='w-1/2 pl-10'>
                    <div className='bg-red-500 h-full pt-8'>

                        <div className='text-3xl text-center text-white mb-6 font-bold'>
                            <h1>{currentMovie.titleOfContainer}</h1>
                        </div>

                        <div className='px-20'>

                            <div className="mb-5 ">

                                <label className="block text-white text-2xl mb-2">
                                    Title:
                                </label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="title" type="text" placeholder="Title" name="title" onChange={handleCurrentBundleChange} value={currentMovie.title} required />
                            </div>
                            <Notification content={notificationError.content} title={notificationError.title} hidden={notificationError.hidden} handleDoneBtn={() => {setNotificationError({...notificationError, ['hidden']: true})}}  ></Notification>
                            <div className="mb-5 ">

                                <label className="block text-white text-2xl mb-2">
                                    Poster Path:
                                </label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="title" type="text" placeholder="Title" name="posterPath" onChange={handleCurrentBundleChange} value={currentMovie.posterPath} required />
                            </div>

                            <div className="mb-5 ">

                                <label className="block text-white text-2xl mb-2">
                                    Genre:
                                </label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="title" type="text" placeholder="Title" name="genres" onChange={handleCurrentBundleChange} value={currentMovie.genres} required />
                            </div>

                            <div>
                            {currentMovie.btn == 'Edit' &&
                                <button className='mb-7 w-auto px-2 rounded-full m-auto text-center font-normal text-blue-600 hover:underline hover:cursor-pointer text-md' onClick={handleAddNewMovie}>Add new movie</button>
                            }

                            <div className={[' w-32 font-bold py-2 px-10 text-xl rounded-full m-auto text-center text-white', styles.addEditMovieBtn].join(' ')} >
                                <button onClick={handleAddEditMovieBtn}>{currentMovie.btn}</button>
                            </div>

         
                            </div>

                        </div>

                    </div>



                </div>
            </div>

        </div>
    )
}

export default AdminMovies