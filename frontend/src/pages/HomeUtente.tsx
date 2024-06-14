import React, { useEffect, useState } from 'react';
import Login from './Login';
import Navbar from '../components/Navbar';
import CardList from '../components/CardList';

interface HomeUtenteProps {
    token: string;
}

const HomeUtente: React.FC<HomeUtenteProps> = ({ token }) => {
    const [vehicles, setVehicles] = useState([]);
    let email = localStorage.getItem('email') || '';
    let id = localStorage.getItem('id') || '';

    const getVechicles = async () => {

        try {
            let token = localStorage.getItem('token');
            const response = await fetch('http://localhost:4000/api/get/userVehicles?id_utente='+id, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });

            
            const data = await response.json();
        
            if (response.ok) {
                setVehicles(data);
            } else {
                setVehicles([]);
            }
        } catch (error) {
            console.error('Errore durante la richiesta:', error);
        }
    }

    useEffect (() => {
        getVechicles();
    }, []);

    if(!token) {
        return (
            <div className="App">
                <Login token='' />
            </div>
        );
    }

    if(!vehicles || vehicles.length === 0) {
        return (
            <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
                <Navbar />
                <div className='max-w-screen-xl mx-auto'>
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-3xl p-10">Garage di <span className='italic' >{email}</span></h1>
                    <h1 className='text-center text-2xl text-gray-500 italic my-10' >Non ci sono veicoli nel tuo garage!</h1>
                </div>
            </div>
        );
    }
    
    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
            <Navbar />
            <div className='max-w-screen-xl mx-auto'>
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-3xl p-10">Garage di <span className='italic' >{email}</span></h1>
                <CardList cards={vehicles} />
            </div>
        </div>
    );

};

export default HomeUtente;
