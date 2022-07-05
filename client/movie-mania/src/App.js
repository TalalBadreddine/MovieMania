import React,{useState, useEffect} from 'react';
import {Routes, Route} from 'react-router-dom'
import Landing from '../src/Routes/Landing/Landing';
import './CommunColors.css'

function App() {

  return (
    <div className="App">
 
      <Routes>
          <Route index path='/' element={<Landing />} />

      </Routes>
    </div>
  );
}

export default App;
