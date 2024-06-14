import React from 'react';
import { FaPencil } from "react-icons/fa6";

interface CardSpesaProps {
  descrizione: string;
  importo: number;
  categoria: string;
  data: string;
  tipo: string;
}

const CardSpesa: React.FC<CardSpesaProps> = ({ descrizione, importo, categoria, data, tipo }) => {
  return (
    <div className="w-full flex flex-row justify-between bg-white shadow-md rounded-lg p-4 m-2">
        <p className='px-3 w-16'>{descrizione}</p>
        <p className='px-3'>{importo}</p>
        <p className='px-3'>{categoria}</p>
        <p className='px-3'>{new Date(data).toLocaleString().split(",")[0]}</p>
        <p className='px-3'>{tipo}</p>
        <FaPencil size={20} className='text-blue-600' />
    </div>
  );
};

export default CardSpesa;
