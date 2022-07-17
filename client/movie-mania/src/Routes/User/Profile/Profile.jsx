import React from 'react'
import styles from './Profilecss.module.css';

const Profile = () => {

    const handleClickPassword = () => { 
        document.getElementById('password').style.remove('display:none')
    }

  return (
    <div className={styles.pageContent}>
    <div >
        <h2 className='text-white text-3xl text-center underline'>My Info</h2>
    </div>
    <div className='items-center text-center mt-20'>
        <label className=' text-2xl mr-10 text-white'>First Name :</label>
        <input 
        type="text"
        className='bg-gray-50 border  border-gray-300 outline-0 w-[350px] text-center text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
        placeholder='Enter First Name'
        />
        <br />
        <br />
        <form action="#">
        <label className='mr-10 text-2xl text-white'>Last Name :</label>
        <input 
        type="text"
        className='bg-gray-50 border border-gray-300 outline-0 w-[350px] text-center text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
        placeholder='Enter Last Name'
        />
        <br />
        <br />
        <label className='mr-20 text-2xl text-white'>E-mail :</label>
        <input 
        type="email"
        disabled
        className='bg-gray-50 border border-gray-300 outline-0 w-[350px] text-center text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
        placeholder='User@example.com'
        />
        <br /><br />
        <button className={styles.passwordButton} onClick={handleClickPassword}>Change Password</button>
        <div id='password' style={{display: 'none'}}>
        <br />
        <br />
        <label className='mr-10 text-xl text-white'>Current Passowrd :</label>
        <input 
        type="Password"
        className='bg-gray-50 border border-gray-300 outline-0 w-[350px] text-center text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
        placeholder='Enter Current Passowrd'
        />
        <br />
        <br />
        <label className='mr-16 text-xl text-white'>New Password :</label>
        <input 
        type="password"
        className='bg-gray-50 border border-gray-300 outline-0 w-[350px] text-center text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
        placeholder='Enter New Password'
        />
        <br />
        <br />
        <label className='mr-9 text-xl text-white'>Confirm Password :</label>
        <input 
        type="password"
        className='bg-gray-50 border border-gray-300 outline-0 w-[350px] text-center text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
        placeholder='Confirm New Password'
        />
        </div>
        <br /><br />
        <label className='mr-10 text-2xl text-white'>Current Bundle : Basic</label>
        <br /><br />
        <p className='text-white text-2xl'>Movie Limit : 5</p>
        <br />
        <p className='text-white text-2xl'>Movie Subscribed: 16</p>
        <br />
        <p className='text-white text-2xl'>Bundle End Time : 12-12-12</p>
        <br /><br />
        <button type='submit' className={styles.saveButton}>Save Changes</button>
        </form>
    </div>
    <br /><br />
    </div>
  )
}

export default Profile