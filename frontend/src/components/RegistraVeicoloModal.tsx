// src/components/ListaSpese.tsx

import React, { useState } from 'react';
import SelectMarca from './SelectMarca';
import SelectModello from './SelectModello';
import SelectVersione from './SelectVersione';

const RegistraVeicoloModal = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [marca, setMarca] = useState('');
  const [modello, setModello] = useState('');
  const [idModello, setIdModello] = useState(-1);
  const [targa, setTarga] = useState('');
  const [primaImmatricolazione, setPrimaImmatricolazione] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleRegistraVeicolo = async (e: React.FormEvent) => {
    e.preventDefault();
    let token = localStorage.getItem('token');
    let id_utente = localStorage.getItem('id');
    const response = await fetch('http://localhost:4000/api/post/aggiungiVeicolo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        targa: targa,
        id_utente: id_utente,
        id_modello: idModello,
        primaImmatricolazione: primaImmatricolazione
      })
    });

    const data = await response.json();

    if (response.ok) {
      window.location.reload();
    } else {
      setErrorMessage(data.message);
    }
  }

  return (
    <div className="flex flex-col items-center w-full">
      <button
        onClick={openModal}
        className="w-full max-w-2xl m-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
      >
        Aggiungi veicolo
      </button>
      <div className="flex items-center justify-center h-screen">

      {modalOpen && (
        <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center">
          <div className="relative bg-white w-full max-w-md mx-auto rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Registra Veicolo</h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <form onSubmit={handleRegistraVeicolo} >
              <div className="grid gap-4 mb-4 grid-cols-2">
                  <div className="col-span-2">
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Targa</label>
                      <input onChange={e => setTarga(e.target.value)} minLength={7} maxLength={7} type="text" name="targa" id="targa" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="AB123CD" required />
                  </div>
                  <div className="col-span-2">
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Marca</label>
                      <SelectMarca setMarca={setMarca}/>
                  </div>
                  <div className="col-span-2">
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Modello</label>
                      <SelectModello marca={marca} setModello={setModello}  />
                  </div>
                  <div className="col-span-2">
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Versione</label>
                      <SelectVersione marca={marca} modello={modello} setIdModello={setIdModello} />
                  </div>
                  <div className="col-span-2">
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Prima immatricolazione</label>
                      <input onChange={e => setPrimaImmatricolazione(e.target.value)}  type="Date" name="primaImmatricolazione" id="primaImmatricolazione" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="AB123CD" required />
                  </div>
              </div>
              <p className="my-2 text-sm text-red-600 dark:text-red-500 text-center">{errorMessage}</p>
              <div className="flex justify-center items-center w-full h-full">
                <button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-0 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path>
                  </svg>
                  Registra Veicolo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
    </div>

  );
};

export default RegistraVeicoloModal;
