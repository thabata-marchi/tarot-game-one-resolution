import React, { useState, useEffect } from 'react';
import shuffle from 'shuffle-array';
import api from '../../services/api';
import './CardTable.css';
import CardsTarot from '../CardsTarot';
import ButtonGame from '../ButtonGame';

const CardTable = () => {
  const [ cardsTarot, setCardsTarot ] = useState([]);
  const [ pathCard, setPathCard ] = useState([]);

  useEffect(() => {
    api.ConnectApi()
    .then(response => {
      if( response.status === 200 ){
        const cards = response.data.cards.map(
          (item, index) => ({...item, flipped: false, id: index})
        );
        setCardsTarot(cards);
        setPathCard({url: response.data.imagesUrl, cardBack: response.data.imageBackCard});
      }
  })
    .catch( error => console.log( error) )
  }, [])  

  const CardTurn = (id) => {
    let index = cardsTarot.findIndex( card => card.id === id );
    const newCardsTarot = [ ... cardsTarot ];
          newCardsTarot[index].flipped = !newCardsTarot[index].flipped;    
    setCardsTarot(newCardsTarot);
  }

  const GameInit = () => {
    setCardsTarot(shuffle(filterCard));
    cardsTarot.forEach( item => { CardTurn(item.id) });
    let isCardTurn = cardsTarot.filter( item => item.flipped );    
    if( isCardTurn.length <= 1 ) return cardsTarot.forEach( item => { CardTurn(item.id) });
  }

  const filterCard = cardsTarot.filter(({image}) => image !== undefined);
  const ShowCard = () => 
    <div className="row cards-table">
      {filterCard
        .map(({name, image, flipped, id}, index) => 
          <CardsTarot 
          key={index}
          index={index} 
          name={name}
          image={image}
          flipped={flipped}
          id={id}
          pathCard={pathCard}
          setPathCard={setPathCard}
          cardsTarot={cardsTarot}
          CardTurn={CardTurn}   
        />
      )}
    </div>


  return(
    <div className="container">   
      <ButtonGame GameInit={GameInit} />
      <ShowCard />
    </div>
  ) 
}

export default CardTable;