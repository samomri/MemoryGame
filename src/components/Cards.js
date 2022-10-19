import React from 'react'
import Card from './Card';

const Cards = ({cards,handleClick,pickOne,pickTwo,start}) => {
  return (
    <div className="grid">
        {cards.map((card) => {
          // Destructured card properties
          const { image, id, matched } = card;

          return (
            <Card
              key={id}
              card={card}
              image={image}
              onClick={() => handleClick(card)}
              selected={card === pickOne || card === pickTwo || matched || start}
            />
          );
        })}
      </div>
  )
}
export default Cards
