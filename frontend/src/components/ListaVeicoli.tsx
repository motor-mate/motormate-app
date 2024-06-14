// src/components/ListaSpese.tsx

import React from 'react';
import Card from './Card';

interface ListaVeicoliProps {
  cards: { marca: string; modello: string, targa: string }[];
}

const ListaVeicoli: React.FC<ListaVeicoliProps> = ({ cards }) => {
  return (
    <div className="flex flex-col items-center">
      {cards.map((card, index) => (
        <Card key={index} marca={card.marca} modello={card.modello} targa={card.targa} />
      ))}
    </div>
  );
};

export default ListaVeicoli;
