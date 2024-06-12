import React, { useState } from 'react';
import Login from './components/Login';
import RegistrazioneAzienda from './components/RegistrazioneAzienda';
import RegistrazionePrivato from './components/RegistrazionePrivato';
import './index.css';
import { Tabs } from "flowbite-react";
import { HiOutlineLogin, HiOutlineUserGroup, HiOutlineUser } from "react-icons/hi";
//import ViewRegistrazione from './gui/InterfacciaRegistrazione';


const App: React.FC = () => {
  const [token, setToken] = useState(null);
  return (
    <div className="App">

      
      <section className="bg-gray-50 dark:bg-gray-900" style={{backgroundImage: "url(/images/wallpaper.jpg)", backgroundSize: 'cover'}}>
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white p-10">
              Registrazione
          </h1>
          <div className="w-full bg-white shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <Tabs aria-label="Default tabs" style="fullWidth">
              <Tabs.Item active title="Privato" icon={HiOutlineUser }>
                <RegistrazionePrivato />
              </Tabs.Item>
              <Tabs.Item title="Azienda" icon={HiOutlineUserGroup}>
                <RegistrazioneAzienda />
              </Tabs.Item>
            </Tabs>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
