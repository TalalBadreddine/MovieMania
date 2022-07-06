import {Routes, Route} from 'react-router-dom'
import Landing from '../src/Routes/Landing/Landing';
import './CommunColors.css'
import Register from './Routes/Register/Register';

function App() {

  return (
    <div className="App">
 
      <Routes>
          <Route index path='/' element={<Landing />}>

          </Route>
          <Route path='/Register' element={<Register />}/>
      </Routes>
    </div>
  );
}

export default App;
