import {Routes, Route} from 'react-router-dom'
import Landing from '../src/Routes/Landing/Landing';
import './CommunColors.css'
import Bundles from './Routes/Bundles/Bundles';

function App() {

  return (
    <div className="App">
 
      <Routes>
        
          <Route index path='/' element={<Landing />}/>

          <Route path = 'payments' element = {<Bundles />} />

      </Routes>
    </div>
  );
}

export default App;
