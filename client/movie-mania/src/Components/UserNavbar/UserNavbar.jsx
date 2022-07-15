import React from 'react'
import {Outlet} from 'react-router-dom';

const UserNavbar = () => {
  return (
    <div>
    <div className='flex items-center justify-between p-4 z-[100] absolute w-full'>
        <h1 className='text-white text-2xl font-bold cursor-pointer'>Movie Mania</h1>
        <div className='inline-flex mr-10'>
            <ul className='text-white list-none inline-flex'>
                <li className='pr-10'>
                    <a href="#">News</a>
                </li>
                <li>
                   Profile
                </li>
            </ul>
        </div>
    </div>
    <Outlet />
    </div>
  )
}

export default UserNavbar