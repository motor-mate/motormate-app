// src/components/CardList.tsx

import React from 'react';
import Card from './Card';

interface CardListProps {
  cards: { marca: string; modello: string, targa: string }[];
}

const CardList: React.FC<CardListProps> = ({ cards }) => {
  return (
    <div className="flex flex-col items-center">
      {cards.map((card, index) => (
        <Card key={index} marca={card.marca} modello={card.modello} targa={card.targa} />
      ))}
    </div>
  );
};

export default CardList;
