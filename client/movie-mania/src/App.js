import {Routes, Route} from 'react-router-dom'
import Landing from '../src/Routes/Landing/Landing';
import './CommunColors.css'
import AdminNavBar from './Components/AdminNavBar/AdminNavBar';
import Success from './Components/Success/Success';
import AdminBundles from './Routes/AdminBundles/AdminBundles';
import AdminMovies from './Routes/AdminMovies/AdminMovies'
import AdminDashboard from './Routes/AdminDashboard/AdminDashboard';
import AdminUsers from './Routes/AdminUsers/AdminUsers';
import Bundles from './Routes/Bundles/Bundles';

function App() {

  return (
    <div className="App">



      <Routes>
        
          <Route path='/' element={<Landing />}> 

            <Route path='success' element={<Success></Success>} ></Route>

          </Route>


          <Route path = 'payments' element = {<Bundles />} />


          <Route path='admin' element={<AdminNavBar/>}>

                <Route path='dashboard' element={<AdminDashboard/>} />

                <Route path='users' element={<AdminUsers/>} />

                <Route path='movies' element={ <AdminMovies /> } />
                
                <Route path='bundles' element={<AdminBundles/>} />

          </Route>
          
          
      </Routes>
 
    </div>
  );
}

export default App;
