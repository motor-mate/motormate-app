import React, { useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';
//import ViewRegistrazione from './gui/InterfacciaRegistrazione';


const App: React.FC = () => {
  const [token, setToken] = useState(null);
  return (
    <div className="App">
      <h1>Login</h1>
      <Login />
      <h1>Registrazione</h1>
      <Register />
    </div>
  );
}

export default App;
