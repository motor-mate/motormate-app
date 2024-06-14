// src/components/Card.tsx

import React from 'react';
import { FaCar, FaTrash } from "react-icons/fa";

interface CardProps {
  marca: string;
  modello: string;
  targa: string;
}

const Card: React.FC<CardProps> = ({ marca, modello, targa }) => {
  return (
    <a href={`/spese/${targa}`}>
    <div className="bg-white shadow-md rounded-lg p-4 mb-4 w-full max-w-2xl hover:shadow-xl flex justify-between">
      <div className="flex items-center">
        <FaCar size={24} className='text-blue-600' />
        <p className='px-3 text-xl'><span className='font-bold'>{marca} {modello}</span> - {targa}</p>
      </div>
      <FaTrash size={24} className='text-blue-600' />
    </div>
    </a>
  );
};

export default Card;
