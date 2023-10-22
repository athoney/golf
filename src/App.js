import Hand from './components/Hand';
import Deck from './components/Deck';
import './App.css';
import React from 'react';
import { useWindowDimensions } from 'react-native';
import { useState, useEffect } from 'react';
import LeaderBoard from './components/Scores';
import ScoreHand from './logic/ScoreHand';
import PlayerForms from './components/PlayersForm';

function App() {
  const { height } = useWindowDimensions();
  const handHeight = (height) * (2 / 5);
  const deckHeight = (height) * (1 / 5);
  const [started, setStarted] = useState(false);

  let numbers = Array.from({ length: 52 }, (_, i) => i + 1);
  const [deck, setDeck] = useState([]);
  const [discard, setDiscard] = useState([]);
  const [playerOne, setPlayerOne] = useState({});
  const [playerTwo, setPlayerTwo] = useState({});
  const [selectedDiscard, setSelectedDiscard] = useState(false);
  const [selectedDeck, setSelectedDeck] = useState(false);
  const [discardClass, setDiscardClass] = useState("");
  const [game, setGame] = useState({});

  useEffect(() => {
    if (selectedDiscard) {
      setDiscardClass("selected");
    } else {
      setDiscardClass("");
    }
  }, [selectedDiscard]);

  useEffect(() => {

    if (playerOne.cards && playerTwo.cards) {
      let allFlipped = true;
      playerOne.cards.forEach((card) => {
        if (!card.flipped) {
          allFlipped = false;
        }
      })
      playerTwo.cards.forEach((card) => {
        if (!card.flipped) {
          allFlipped = false;
        }
      })
      if (allFlipped) {
        const scores = ScoreHand(playerOne, playerTwo)
        setGame((prev) => {
          return {
            currentHole: prev.currentHole + 1,
            golferOne: prev.golferOne,
            golferTwo: prev.golferTwo,
            scores: [
              ...prev.scores.map((hole) => {
                if (hole.hole === prev.currentHole) {
                  return {
                    hole: hole.hole,
                    playerOne: scores[0],
                    playerTwo: scores[1]
                  }
                }
                return hole;
              }),
            ]
          }
        })
        startHole();
      }
    }

  }, [playerOne, playerTwo])

  function getCard() {
    const deckSize = numbers.length;
    const i = Math.floor(Math.random() * deckSize);
    const card = numbers[i];
    numbers = numbers.filter((c) => c !== card);
    return card;
  }

  const addHole = () => {
    setGame((prev) => {
      return {
        currentHole: prev.currentHole,
        golferOne: prev.golferOne,
        golferTwo: prev.golferTwo,
        scores: [
          ...prev.scores,
          {
            hole: prev.currentHole,
            playerOne: null,
            playerTwo: null
          }
        ]
      }
    })
  }

  const startHole = () => {
    // deal cards
    addHole();
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

  const startGame = (golferOne, golferTwo) => {
    setStarted(true);
    setGame({
      currentHole: 1,
      golferOne: golferOne,
      golferTwo: golferTwo,
      scores: []
    });
    startHole();
  }

  function flipDeckCard() {
    if (!selectedDeck) {
      numbers = deck;
      const card = getCard();
      setDeck(numbers);
      setDiscard([card, ...discard])
      setSelectedDiscard(false);
      setSelectedDeck(true);
    }
  }

  const playerOnesTurn = () => {
    setPlayerOne((prev) => {
      return {
        turn: true,
        turnCount: prev.turnCount + 1,
        cards: prev.cards
      }
    })
    setSelectedDeck(false);
  }

  const playerTwosTurn = () => {
    setPlayerTwo((prev) => {
      return {
        turn: true,
        turnCount: prev.turnCount,
        cards: prev.cards
      }
    })
    setSelectedDeck(false);
  }

  const playDiscard = (swapCard) => {
    const card = discard[0];
    setDiscard([swapCard, ...discard.filter((c) => c !== card)])
    setSelectedDiscard(false);
    return card;
  }



  let course;
  if (started) {
    course =
      <>
        <LeaderBoard screenHeight={height / 2} game={game} setGame={setGame} />
        <div className='row d-flex align-items-center justify-content-center' style={{ height: handHeight }}>
          <Hand player="two" selectedDeck={selectedDeck} selectedDiscard={selectedDiscard} playDiscard={playDiscard} changeTurn={playerOnesTurn} setHand={setPlayerTwo} rowHeight={handHeight} data={playerTwo} />
        </div>

        <div className='row d-flex align-items-center justify-content-center' style={{ height: deckHeight }}>
          <Deck rowHeight={deckHeight} flipDeckCard={flipDeckCard} discardClass={discardClass} setSelectedDiscard={setSelectedDiscard} discard={discard} />
        </div>

        <div className='row d-flex align-items-center justify-content-center' style={{ height: handHeight }}>
          <Hand player="one" selectedDeck={selectedDeck} selectedDiscard={selectedDiscard} playDiscard={playDiscard} changeTurn={playerTwosTurn} setHand={setPlayerOne} rowHeight={handHeight} data={playerOne} />
        </div>
      </>
  } else {
    course = <PlayerForms startGame={startGame} />
  }

  return (
    <div className="App">
      {course}
    </div>
  );
}

export default App;
