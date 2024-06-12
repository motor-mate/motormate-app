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
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if(localStorage.getItem('token')) {
        try {
          const response = await fetch("http://localhost:4000/api/verify", {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });
  
          if(response.ok) {
            setToken(localStorage.getItem('token'));
          } else {
            setToken(null);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
          setToken(null);
        }
      } else {
        setToken(null);
      }
    };
  
    fetchData();
  }, []);

  if(token) {
    return (
      <Router >
          <Routes>
                <Route path="/" element={<HomeUtente />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Registrazione />} />
              </Routes>
      </Router>
  );
  } else {
    return (
      <div className="App">
        <Login />
      </div>
    );
  }
}

export default App;
