import React from 'react';
import './CardsTarot.css';

const CardsTarot = ({image, name, SelectCard, isSelected }) => {
  const visibleInfo = isSelected ? "visible" : "hide";

  return (
      <div className="col l2 m4 s12">
        <div className="cards" onClick={SelectCard}>
          <img src={image} alt="Imagens" />
        </div>
        <div className={`card-body ${visibleInfo}`}>
          <h2 className="card-title">{name}</h2>
          <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        </div>
      </div>
  )
}

export default CardsTarot;