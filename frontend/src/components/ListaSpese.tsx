import React from 'react';
import CardSpesa from './CardSpesa';
import { FaPencil } from "react-icons/fa6";

interface ListaSpeseProps {
  spese: { descrizione: string; importo: number; categoria: string; data: string; tipo: string }[];
}

const ListaSpese: React.FC<ListaSpeseProps> = ({ spese }) => {
  return (
    <div className="flex flex-col items-center bg-gray-300 p-8 rounded-md border border-black">
      <div className="w-full flex flex-row justify-between bg-blue-600 text-white font-bold shadow-md rounded-lg p-4 m-2">
        <p className='px-3 w-40'>Descrizione</p>
        <p className='px-3'>Importo</p>
        <p className='px-3 w-32'>Categoria</p>
        <p className='px-3'>Data</p>
        <p className='px-3'>Tipo</p>
        <FaPencil size={20} className='text-blue-600' />
      </div>
      {spese.length === 0 && <h1 className='text-center text-2xl text-gray-500 italic my-10' >Non hai ancora registrato alcuna spesa per questo veicolo</h1>}
      {spese.map((spesa, index) => (
        <CardSpesa key={index} 
          descrizione={spesa.descrizione} 
          importo={spesa.importo} 
          categoria={spesa.categoria} 
          data={spesa.data} 
          tipo={spesa.tipo}
        />
      ))}

      <button className="w-full m-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50">
        Aggiungi spesa
      </button>
      
    </div>
  );
};

export default ListaSpese;