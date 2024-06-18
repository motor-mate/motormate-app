import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ListaSpese from '../components/ListaSpese';

interface SpeseVeicoloProps {
    token: string;
}

const SpeseVeicolo: React.FC<SpeseVeicoloProps> = ({ token }) => {

    const { targa } = useParams();
    const [spese, setSpese] = useState([]);
    let email = localStorage.getItem('email') || '';

    const getSpese = async () => {
        try {
            let token = localStorage.getItem('token');
            const response = await fetch('http://localhost:4000/api/get/speseVeicolo?targa='+targa, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            
            const data = await response.json();
            console.log(data);
        
            if (response.ok) {
                setSpese(data);
            } 
            else {
                window.location.href = '/logout';
            }
        } catch (error) {
            console.error('Errore durante la richiesta:', error);
        }
    }

    useEffect (() => {
        getSpese();
    }, []);

    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
            <Navbar />
            <div className='max-w-screen-xl mx-auto'>
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-3xl p-10">
                    Gestione spese del veicolo <span className='italic' >{targa}</span>
                </h1>
                <ListaSpese spese={spese} />
            </div>
        </div>
    );

};

export default SpeseVeicolo;