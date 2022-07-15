import React from 'react'
import Main from '../../../Components/Main/Main'
import Row from '../../../Components/Rows/Row'
import requests from '../../../Request'
import SearchBar from '../../../Components/searchBar/SearchBar'
import Filter from '../../../Components/filters/Filter'
import styles from './Homecss.module.css'

const Home = () => {
  return (
    <div className={styles.pageContent}>
        <Main />
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