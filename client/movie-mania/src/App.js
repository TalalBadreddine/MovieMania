import {Routes, Route} from 'react-router-dom'
import Landing from '../src/Routes/Landing/Landing';
import './CommunColors.css'
import AdminNavBar from './Components/AdminNavBar/AdminNavBar';
import Success from './Components/Success/Success';
import AdminMovies from './Routes/Admin/AdminMovies/AdminMovies'
import AdminDashboard from './Routes/Admin/AdminDashboard/AdminDashboard';
import AdminUsers from './Routes/Admin/AdminUsers/AdminUsers';
import Bundles from './Routes/Bundles/Bundles';
import AdminBundles from './Routes/Admin/AdminBundles/AdminBundles';
import Logout from './Components/Logout/Logout';
import MovieDetail from './Routes/User/MovieDetails/MovieDetails';

function App() {

  return (
    <div className="App">



      <Routes>
        
          <Route path='/' element={<Landing />}> 

            <Route path='success' element={<Success></Success>} ></Route>

          </Route>


          <Route path = 'payments' element = {<Bundles />} />


          <Route path='admin' element={<AdminNavBar/>}>

                <Route path='' element={<Logout/>} />

                <Route path='dashboard' element={<AdminDashboard/>} />

                <Route path='users' element={<AdminUsers/>} />

                <Route path='movies' element={ <AdminMovies /> } />
                
                <Route path='bundles' element={<AdminBundles/>} />

          </Route>

          <Route path='movies' element = {<MovieDetail movieId='979163' key={'1'} />} />
          
          
      </Routes>
 
    </div>
  );
}

export default App;
