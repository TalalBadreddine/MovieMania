import {Routes, Route} from 'react-router-dom'
import Landing from '../src/Routes/Landing/Landing';
import './CommunColors.css'
import React from 'react'

const LazyAdminNavBar = React.lazy(() => import('./Components/AdminNavBar/AdminNavBar'))
const LazySuccess = React.lazy(() => import('./Components/Success/Success'))
const LazyAdminMovies = React.lazy(() => import('./Routes/Admin/AdminMovies/AdminMovies'))
const LazyAdminDashboard = React.lazy(() => import('./Routes/Admin/AdminDashboard/AdminDashboard'))
const LazyAdminUsers = React.lazy(() => import('./Routes/Admin/AdminUsers/AdminUsers'))
const LazyBundles = React.lazy(() => import('./Routes/Bundles/Bundles'))
const LazyAdminBundles = React.lazy(() => import('./Routes/Admin/AdminBundles/AdminBundles'))
const LazyLogout = React.lazy(() => import('./Components/Logout/Logout'))
const LazyMovieDetails = React.lazy(() => import('./Routes/User/MovieDetails/MovieDetails'))
const LazyUserNavbar = React.lazy(() => import('./Components/UserNavbar/UserNavbar'))
const LazyUserHome = React.lazy(() => import('./Routes/User/UserHome/Home'))
const LazyMyMovies = React.lazy(() => import('./Routes/User/MyMovies/MyMovies')) 

function App() {

  return (
    <div className="App">


    <React.Suspense fallback='Loading ...'>
      
      <Routes>
        
          <Route path='/' element={<Landing />}> 

            <Route path='success' element={<LazySuccess/>} ></Route>

          </Route>


          <Route path = 'payments' element = {<LazyBundles />} />


          <Route path='admin' element={<LazyAdminNavBar/>}>

                <Route path='' element={<LazyLogout/>} />

                <Route path='dashboard' element={<LazyAdminDashboard/>} />

                <Route path='users' element={<LazyAdminUsers/>} />

                <Route path='movies' element={ <LazyAdminMovies /> } />
                
                <Route path='bundles' element={<LazyAdminBundles/>} />

          </Route>

            <Route path='user' element={<LazyUserNavbar />} > 

              <Route path='movies' element={<LazyUserHome/>} />

              <Route path='movieDetails' element = {<LazyMovieDetails movieId='979163' key={'testing'} />} />

              <Route path='myMovies' element = {<LazyMyMovies />} />



              </Route>

          
          
      </Routes>

      </React.Suspense>
 
    </div>
  );
}

export default App;
