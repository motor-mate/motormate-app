import React from 'react';

// Component that represents the registration interface
export default function InterfacciaRegistrazione() {
    return (
        <div>
            <h1>Registrazione</h1>
            <form>
                <label>
                    Nome:
                    <input type="text" name="nome" />
                </label>
                <br />
                <label>
                    Cognome:
                    <input type="text" name="cognome" />
                </label>
                <br />
                <label>
                    Email:
                    <input type="email" name="email" />
                </label>
                <br />
                <label>
                    Password:
                    <input type="password" name="password" />
                </label>
                <br />
                <button type="submit">Registrati</button>
            </form>
        </div>
    );
};