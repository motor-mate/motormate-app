import React, { useEffect } from 'react';

const Logout: React.FC = () => { 
  useEffect(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('email');
    window.location.href = '/login';
  })
  return (
    <div>
    </div>
  );
}

export default Logout;