import './index.css';
import React, { useEffect, useState } from 'react';
import Login from './pages/Login';
import Registrazione from './pages/Registrazione';
import HomeUtente from './pages/HomeUtente';
//import ViewRegistrazione from './gui/InterfacciaRegistrazione';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";



const App: React.FC = () => {
  let token = localStorage.getItem('token') || '';

  return (
      <Router >
        <Routes>
          <Route path="/" element={<HomeUtente token={token} />} />
          <Route path="/login" element={<Login  token={token} />} />
          <Route path="/register" element={<Registrazione  token={token} />} />
        </Routes>
      </Router>
  );
  
}

export default App;
