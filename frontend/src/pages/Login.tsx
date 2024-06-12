import React, { useState } from 'react';


const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const response = await fetch('http://localhost:4000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            console.log('Login effettuato con successo', data);
            localStorage.setItem('token', data.token);
            // Redirect to root
            window.location.href = '/';
        } else {
            console.error('Errore durante il login:', data.message);
            setErrorMessage(data.message);
        }


    };

    return (
        <section className="bg-gray-50 dark:bg-gray-900" style={{backgroundImage: "url(/images/wallpaper.jpg)", backgroundSize: 'cover'}}>
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-3xl p-10">Login</h1>
                <div className="w-full bg-white shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                <input value={email} onChange={e => setEmail(e.target.value)} type="text" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder='example@domain.com' required/>
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input value={password} onChange={e => setPassword(e.target.value)} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" required/>
                            </div>
                            <p className="mt-2 text-sm text-red-600 dark:text-red-500 text-center">{errorMessage}</p>
                            <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:outline-none font-medium text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Non hai un account? <a href="/register" className="font-medium text-blue-600 hover:underline dark:text-blue-500">Registrati</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );

};

export default Login;