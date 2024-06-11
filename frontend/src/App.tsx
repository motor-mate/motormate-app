import React from 'react';
import Login from './components/Login';
import Register from './components/Register';
//import ViewRegistrazione from './gui/InterfacciaRegistrazione';


function App() {
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
