import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';

import Home from './Components/home';
import Edit from './Components/edit';
import Challenge from './Components/challenge';
import Participate from './Components/participate';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/challenge" element={<Challenge />} />
        <Route path="/edit/:id" element={<Edit/>} />
        <Route path="/participate/:id" element={<Participate/>} />
        <Route path="/participate" element={<Participate/>}  />


        
      </Routes>
    </Router>
  );
}

export default App;
