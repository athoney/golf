import Hand from './components/Hand';
import Deck from './components/Deck';
import './App.css';
import React from 'react';
import { useWindowDimensions } from 'react-native';
import { useState, useEffect } from 'react';
import LeaderBoard from './components/Scores';
import ScoreHand from './logic/ScoreHand';
import PlayerForms from './components/PlayersForm';
import Rules from './components/Rules.js';

function App() {
  const { height } = useWindowDimensions();
  const handHeight = (height) * (2 / 5);
  const deckHeight = (height) * (1 / 5);
  const [status, setStatus] = useState("check-in");

  let numbers = Array.from({ length: 52 }, (_, i) => i + 1);
  const [deck, setDeck] = useState([]);
  const [discard, setDiscard] = useState([]);
  const [playerOne, setPlayerOne] = useState({});
  const [playerTwo, setPlayerTwo] = useState({});
  const [selectedDiscard, setSelectedDiscard] = useState(false);
  const [selectedDeck, setSelectedDeck] = useState(false);
  const [discardClass, setDiscardClass] = useState("");
  const [game, setGame] = useState({});

  let playerOneBackground = "white";
  let playerTwoBackground = "white";

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
            ...prev,
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
        toggleRoundButton();
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

  const startHole = () => {
    // deal cards
    toggleRoundButton();
    if (game.currentHole === 9) {
      setStatus("game-over");
      return;
    }
    setGame((prev) => {
      return {
        ...prev,
        currentHole: prev.currentHole + 1,
        scores: [...prev.scores, { hole: prev.currentHole + 1, playerOne: null, playerTwo: null }]
      }
    });
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
    setStatus("playing");
    setGame({
      currentHole: 0,
      golferOne: golferOne,
      golferTwo: golferTwo,
      scores: []
    });
    toggleRoundButton();
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

  function toggleRoundButton() {
    const button = document.getElementById("new-round");
    button.classList.toggle("d-none");
  }

  let course;
  if (status == "playing") {
    course =
      <>
        <button onClick={startHole} className="btn btn-success d-none" id="new-round">Next Round</button>
        <LeaderBoard screenHeight={height / 2} game={game} setGame={setGame} show={false}/>
        <Rules screenHeight={height / 2} game={game} setGame={setGame} />
        
        <div className='row d-flex align-items-center justify-content-center' style={{ height: handHeight, backgroundColor: playerTwoBackground }}>
          <Hand player="two" selectedDeck={selectedDeck} selectedDiscard={selectedDiscard} playDiscard={playDiscard} changeTurn={playerOnesTurn} setHand={setPlayerTwo} rowHeight={handHeight} data={playerTwo} />
        </div>

        <div className='row d-flex align-items-center justify-content-center' style={{ height: deckHeight }}>
          <Deck rowHeight={deckHeight} flipDeckCard={flipDeckCard} discardClass={discardClass} setSelectedDiscard={setSelectedDiscard} discard={discard} />
        </div>

        <div className='row d-flex align-items-center justify-content-center' style={{ height: handHeight, backgroundColor: playerOneBackground  }}>
          <Hand player="one" selectedDeck={selectedDeck} selectedDiscard={selectedDiscard} playDiscard={playDiscard} changeTurn={playerTwosTurn} setHand={setPlayerOne} rowHeight={handHeight} data={playerOne} />
        </div>
      </>
  } else if (status == "check-in") {
    course =
      <>
        <button onClick={startHole} className="btn btn-success d-none" id="new-round">Next Round</button>
        <PlayerForms startGame={startGame} />

      </>
  } else if (status == "game-over") {
    course =
      <>
        <LeaderBoard screenHeight={height / 2} game={game} setGame={setGame} show={true}/>
        <div>
          <h1>Game Over</h1>
          {game.scores[game.scores.length - 1].playerOne < game.scores[game.scores.length - 1].playerTwo ? <h2>{game.golferOne} Wins!</h2> : <h2>{game.golferTwo} Wins!</h2>}
          {game.scores[game.scores.length - 1].playerOne === game.scores[game.scores.length - 1].playerTwo ? <h2>It's a tie!</h2> : null}
        </div>
      </>
  }

  return (
    <div className="App">

      {course}
    </div>
  );
}

export default App;
