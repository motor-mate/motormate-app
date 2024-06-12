import React, { useState } from 'react';


const RegistrazionePrivato: React.FC = () => {
    const [email, setEmail] = useState('');
    const [nome, setNome] = useState('');
    const [cognome, setCognome] = useState('');

    const [cf, setCf] = useState('');
    const [residenza, setResidenza] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const response = await fetch('http://localhost:4000/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            console.log('Registrazione effettuata con successo');
            localStorage.setItem('token', data.token);
        } else {
            console.error('Errore durante la registrazione:', data.message);
        }
    };

    return (
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                    
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                        <input value={email} onChange={e => setEmail(e.target.value)} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder='example@domain.com' required/>
                    </div>
                    <div className="grid md:grid-cols-2 md:gap-6">
                        <div>
                            <label htmlFor="nome" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nome</label>
                            <input value={nome} onChange={e => setNome(e.target.value)} type="text" name="nome" id="nome" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder='Mario' required/>
                        </div>
                        <div>
                            <label htmlFor="cpgnome" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cognome</label>
                            <input value={cognome} onChange={e => setCognome(e.target.value)} type="text" name="cognome" id="cognome" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder='Rossi' required/>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="residenza" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Residenza</label>
                        <input value={residenza} onChange={e => setResidenza(e.target.value)} type="text" name="residenza" id="residenza" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder='Via G. Amati 132, Milano' required/>
                    </div>
                    <div>
                        <label htmlFor="cf" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Codice Fiscale</label>
                        <input value={cf} onChange={e => setCf(e.target.value)} type="text" name="cf" id="cf" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder='RSSMRA80A01F205X' required/>
                    </div>
                    
                    <div className="grid md:grid-cols-2 md:gap-6">
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                            <input value={password} onChange={e => setPassword(e.target.value)} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" required/>
                        </div>
                        <div>
                            <label htmlFor="password2" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Conferma Password</label>
                            <input value={password2} onChange={e => setPassword2(e.target.value)} type="password2" name="password2" id="password2" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" required/>
                        </div>
                    </div>
                    <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:outline-none font-medium text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Registrati</button>
                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                        Hai già un account? <a href="/login" className="font-medium text-blue-600 hover:underline dark:text-blue-500">Login</a>
                    </p>
                </form>
        </div>
    );

};

export default RegistrazionePrivato;