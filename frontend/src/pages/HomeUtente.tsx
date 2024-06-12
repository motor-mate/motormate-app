import React, { useState } from 'react';
import Login from './Login';

interface HomeUtenteProps {
    token: string;
}

const HomeUtente: React.FC<HomeUtenteProps> = ({ token }) => {
    if(!token) {
        return (
            <div className="App">
                <Login token='' />
            </div>
        );
    }
    
    return (
        <section className="bg-gray-50 dark:bg-gray-900" style={{backgroundImage: "url(/images/wallpaper.jpg)", backgroundSize: 'cover'}}>
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-3xl p-10">Home Utente</h1>
            </div>
        </section>
    );

};

export default HomeUtente;
