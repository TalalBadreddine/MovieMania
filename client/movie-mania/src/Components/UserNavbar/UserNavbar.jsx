import React from 'react'
import {Outlet, Link, useNavigate} from 'react-router-dom';
import {CgLogOut} from 'react-icons/cg'
import axios from 'axios'
import styles from '../AdminNavBar/AdminNavBarCss.module.css'

const UserNavbar = () => {

  const navigate = useNavigate()

  const handleLogout = async () => {
      await axios.get('/Logout')
      .then((data) => {
          navigate('/')
      })
  }

  return (
    <div>
    <div className='flex items-center justify-between p-4 z-[100] absolute w-full'>
        <h1 className='text-white text-2xl font-bold cursor-pointer'>Movie Mania</h1>
        <div className='inline-flex mr-10'>
            <ul className='text-white list-none inline-flex'>

              <Link to='/user/movies' > <li className='pr-10'> News</li> </Link>
                
         
                <Link to='/user/profile' > <li className='pr-10'>Profile</li></Link>

                <button className={[styles.logoutIcon].join(' ')} onClick={ () => handleLogout()}> <CgLogOut size={32}/> </button>

            </ul>
        </div>
    </div>
    <Outlet />
    </div>
  )
}

export default UserNavbar