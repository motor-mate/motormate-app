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
  const [token, setToken] = useState('');

  const checkToken = async () => {
    if(localStorage.getItem('token')) {
      try {
        const response = await fetch("http://localhost:4000/api/verify", {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if(response.ok) {
          setToken(localStorage.getItem('token') || '');
        } else {
          setToken('');
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setToken('');
      }
    } else {
      setToken('');
    }
  };

  useEffect(() => {  
    checkToken();
  }, []);

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
