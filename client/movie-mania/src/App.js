import {Routes, Route} from 'react-router-dom'
import Landing from '../src/Routes/Landing/Landing';
import './CommunColors.css'
import Success from './Components/Success/Success';
import SuccessCheckMark from './Components/SuccessCheckMark/SuccessCheckMark';
import Bundles from './Routes/Bundles/Bundles';

function App() {

  return (
    <div className="App">
 
      <Routes>
        
          <Route path='/' element={<Landing />}> 

          <Route path='success' element={<Success></Success>} ></Route>

          </Route>


          <Route path = 'payments' element = {<Bundles />} />

      </Routes>
    </div>
  );
}

export default App;
