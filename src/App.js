import Hand from './components/Hand';
import Deck from './components/Deck';
import dealCards from './components/Deck';
import './App.css';
import React from 'react';
import { useWindowDimensions } from 'react-native';
import { useState, useEffect } from 'react';

function App() {
  const { height, width } = useWindowDimensions();
  // console.log("width: " + width + " height: " + height);
  const handHeight = (height) * (2 / 5);
  const deckHeight = (height) * (1 / 5);
  const [started, setStarted] = useState(false);

  let numbers = Array.from({ length: 48 }, (_, i) => i + 1);
  const [deck, setDeck] = useState([]);
  const [discard, setDiscard] = useState([]);
  const [playerOne, setPlayerOne] = useState({});
  const [playerTwo, setPlayerTwo] = useState({});
  const [selectDiscard, setSelectedDiscard] = useState(false);

  useEffect(() => {
    console.log('Player one', playerOne);
  }, [playerOne])

  useEffect(() => {
    console.log('Player two', playerTwo);
  }, [playerTwo])

  useEffect(() => {
    console.log('Deck: ', deck);
  }, [deck])

  useEffect(() => {
    console.log('Discard: ', discard);
  }, [discard])

  const addCardPlayerOne = (card) => {
    setPlayerOne((prev) => {
      return [...prev, card];
    });
  };

  const addCardPlayerTwo = (card) => {
    setPlayerTwo((prev) => {
      return [...prev, card];
    });
  };

  function getCard() {
    const deckSize = numbers.length;
    const i = Math.floor(Math.random() * deckSize);
    const card = numbers[i];
    numbers = numbers.filter((c) => c !== card);
    console.log(card);
    console.log(numbers);
    return card;
  }

  const startGame = () => {
    setStarted(true);
    // deal cards
    let playerOneCards = [];
    let playerTwoCards = [];
    for (let i = 0; i < 12; i++) {
      const card = getCard();
      if (i % 2 === 0) {
        playerOneCards.push(card);
      } else {
        playerTwoCards.push(card);
      }
    }
    const card = getCard();
    let playerOneCardObject = playerOneCards.map((card) => {
      return { value: card, flipped: false }
    });
    console.log(playerOneCardObject);
    console.log("player one: " + playerOneCards);
    console.log("player Two: " + playerTwoCards);
    setPlayerOne({
      turn: true,
      turnCount: 0,
      cards: playerOneCards.map((card) => {
        return { value: card, flipped: false }
      })
    });
    setPlayerTwo({
      turn: true,
      turnCount: 0,
      cards: playerTwoCards.map((card) => {
        return { value: card, flipped: false }
      })
    });
    setDeck(numbers);
    setDiscard([card]);
  }

  function flipDeckCard() {
    numbers = deck;
    const card = getCard();
    setDeck(numbers);
    setDiscard([card, ...discard])
  }

  const playerOnesTurn = (flipCard = true) => {
    setPlayerOne((prev) => {
      return {
        turn: true,
        turnCount: prev.turnCount + 1,
        cards: prev.cards
      }
    })
    if (flipCard) {
      flipDeckCard();
    }
  }

  const playerTwosTurn = (flipCard = true) => {
    setPlayerTwo((prev) => {
      return {
        turn: true,
        turnCount: prev.turnCount,
        cards: prev.cards
      }
    })
    if (flipCard){
      flipDeckCard();
    }
  }

  const playDiscard = (swapCard) => {
    const card = discard[0];
    console.log("discard card " + card)
    setDiscard([swapCard, ...discard.filter((c) => c !== card)])
    return card;
  }



  let course;
  if (started) {
    course =
      <>
        <div className='row d-flex align-items-center justify-content-center' style={{ height: handHeight }}>
          <Hand player="two" selectDiscard={selectDiscard} playDiscard={playDiscard} changeTurn={playerOnesTurn} setHand={setPlayerTwo} rowHeight={handHeight} data={playerTwo} />
        </div>

        <div className='row d-flex align-items-center justify-content-center' style={{ height: deckHeight }}>
          <Deck rowHeight={deckHeight} flipDeckCard={flipDeckCard} setSelectedDiscard={setSelectedDiscard} discard={discard} />
        </div>

        <div className='row d-flex align-items-center justify-content-center' style={{ height: handHeight }}>
          <Hand player="one" selectDiscard={selectDiscard} playDiscard={playDiscard} changeTurn={playerTwosTurn} setHand={setPlayerOne} rowHeight={handHeight} data={playerOne} />
        </div>
      </>
  } else {
    course = <button type="button" id="start-button" className="btn btn-success" onClick={startGame}>Tee time!</button>;
  }

  return (
    <div className="App">
      {course}
    </div>
  );
}

export default App;
