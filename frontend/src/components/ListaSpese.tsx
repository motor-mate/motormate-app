import React from 'react';
import CardSpesa from './CardSpesa';
import { FaPencil } from "react-icons/fa6";

interface ListaSpeseProps {
  spese: { descrizione: string; importo: number; categoria: string; data: string; tipo: string }[];
}

const ListaSpese: React.FC<ListaSpeseProps> = ({ spese }) => {
  return (
    <div className="flex flex-col items-center bg-gray-300 p-8 rounded-md border border-black">
        <div className="w-full flex flex-row justify-between m-2">
            <span>Descrizione</span>
            <span>Importo</span>
            <span>Categoria</span>
            <span>Data</span>
            <span>Tipo</span>
            <FaPencil size={24} className='text-gray-300' />
        </div>

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