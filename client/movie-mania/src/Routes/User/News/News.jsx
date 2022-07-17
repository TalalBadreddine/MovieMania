import React from 'react'
import Filter from '../../../Components/filters/Filter'
import SearchBar from '../../../Components/searchBar/SearchBar'
import Row from '../../../Components/Rows/Row'
import requests from '../../../Request'
import styles from './Newscss.module.css'

const News = () => {
  return (
    <div className={styles.pageContent}>
        <SearchBar/> 
        <br />
        <div className='flex'>
            <div className='ml-5'>
            <Filter />
            </div>
            <br />
            <div className='ml-5'>
            <Row title='> Upcoming Movies'  fetchURL={requests.requestTopRated}/>
            </div>
        </div>
        
    </div>
  )
}

export default News