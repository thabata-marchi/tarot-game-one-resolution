import React, { useState, useEffect } from 'react';
import shuffle from 'shuffle-array';
import api from '../../services/api';
import './CardTable.css';
import CardsTarot from '../CardsTarot';
import ButtonGame from '../ButtonGame';

const CardTable = () => {
  const [cardsTarot, setCardsTarot] = useState([]);
  const [pathCard, setPathCard] = useState([]);

  const [gameIsStart, setGameIsStart] = useState(false);
  const [cardSelected, setCardSelected] = useState("");

  const [oneCard, setOneCard] = useState(false);

  useEffect(() => {
    api.ConnectApi()
      .then(response => {
        if (response.status === 200) {
          const cards = response.data.cards;
          setCardsTarot(cards);
          setPathCard({ url: response.data.imagesUrl, cardBack: response.data.imageBackCard });
        }
      })
      .catch(error => console.log(error))
  }, [])

  const filterCard = cardsTarot.filter(({ image }) => image !== undefined);

  const StartGame = () => {  
    setCardsTarot(shuffle(filterCard));
    setGameIsStart(true);
    setOneCard(false);
    setCardSelected("");
  }

  const SelectCard = card => {
    return eSelect => {
      if( !gameIsStart || cardSelected === card ) return setOneCard(true);
      if( !gameIsStart || cardSelected ) return
      setCardSelected(card)
    }
  }

  const PathImage = image => {
    if(oneCard && cardSelected && cardSelected === image) return StartGame();
    if(gameIsStart && !cardSelected) return pathCard.cardBack;
    if(cardSelected && cardSelected === image) return pathCard.url + image;    
    if(cardSelected && cardSelected !== image) return pathCard.cardBack;
    return pathCard.url + image;
  }

  return (
    <div className="container">
      <ButtonGame StartGame={StartGame} />
      <div className="row cards-table">
        {filterCard
          .map(({name, image}, index) =>
            <CardsTarot
              key={index}
              name={name}
              image={PathImage(image)}
              SelectCard={SelectCard(image)}
              isSelected={!oneCard && cardSelected === image}
            />
          )}
      </div>
    </div>
  )
}

export default CardTable;