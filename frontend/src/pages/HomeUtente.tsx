import React, { useEffect, useState } from 'react';
import Login from './Login';
import Navbar from '../components/Navbar';
import CardList from '../components/CardList';

interface HomeUtenteProps {
    token: string;
}

const HomeUtente: React.FC<HomeUtenteProps> = ({ token }) => {
    const [id, setId] = useState('');

    useEffect (() => {
        setId(localStorage.getItem('id_utente') || '')
    }, []);

    let cards = [
        {
            marca: 'Fiat',
            modello: 'Panda',
            targa: 'AB123CD'
        },
        {
            marca: 'Ford',
            modello: 'Fiesta',
            targa: 'EF456GH'
        },
        {
            marca: 'Opel',
            modello: 'Corsa',
            targa: 'IL789MN'
        }
    ];

    if(!token) {
        return (
            <div className="App">
                <Login token='' />
            </div>
        );
    }

    if(!cards) {
        return (
            <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
                <Navbar />
                <div className='max-w-screen-xl mx-auto'>
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-3xl p-10">Garage di <span className='italic' >{id}</span></h1>
                    <h1 className='text-center text-2xl text-gray-500 italic my-10' >Non ci sono auto nel garage</h1>
                </div>
            </div>
        );
    }
    
    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
            <Navbar />
            <div className='max-w-screen-xl mx-auto'>
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-3xl p-10">Garage di <span className='italic' >{id}</span></h1>
                <CardList cards={cards} />
            </div>
        </div>
    );

};

export default HomeUtente;
