import "./scores.css";


export default function Rules({ screenHeight, game }) {


    return (
        <>

            <div id="mySidenav" className="sidenav">
                <button href="#" id="rules" type="button" className="btn" data-bs-toggle="offcanvas" data-bs-target="#rules-board" style={{ top: screenHeight - 21 }}>Rules</button>
            </div>

            <div className="offcanvas offcanvas-end" tabIndex="-1" id="rules-board" aria-labelledby="leader-board-label">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="leader-board-label">Rules</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body text-start">
                    <h1>Objective</h1>
                    <p>This game is scored as the name suggests, lowest score wins.</p>
                    <h1>Deal</h1>
                    <p>Each player is dealt six cards. The remaining cards are placed in the deck stack (upside down cards in the middle). One card from the deck is flipped to start the discard deck.</p>
                    <h1>First Play</h1>
                    <p>Each player flips two of there cards to start the game. The player who makes the first subsequent play changes by hole.</p>
                    <h1>Subsequent Plays</h1>
                    <p className="mb-0">A player either:</p>
                    <ol>
                        <li>
                            uses the discard to replace any card in their hand
                        </li>
                        <li>
                            flips a card from the deck. Once the player flips a deck card, they can:
                            <ol>
                                <li>
                                    use the new discard to replace any card in their hand
                                </li>
                                <li>
                                    flip a card from their hand
                                </li>
                                <li>
                                    click, "End Turn" to leave their hand as is
                                </li>
                            </ol>
                        </li>
                    </ol>
                    <h1>Scoring</h1>
                    <p>
                        Each player's score is the sum of all cards in their hand. Ace = 1, 2-10 = face value, Jack = 10, Queen = 30, King = -2. If two cards in the same column have the same value, the cards cancel out and score zero points unless they are two kings, two stacked kings = -4. Finally, if a player has a quadrant of cards that are all the same value, the player scores -20 points.
                    </p>
                    <h2>Scoring Examples:</h2>
                    <p><span className="fw-bold">Player One:</span> -20 for the quadrant of twos + 4 and 10 (Jack) = -6</p>
                    <img src={require(`../static/img/hand1.png`)} alt="Hand1" className="w-100"/>
                    <p><span className="fw-bold">Player Two:</span> -4 for the kings + 0 for the other two columns = -4</p>
                    <img src={require(`../static/img/hand2.png`)} alt="Hand1" style={{ transform: "rotate(180deg)" }}className="w-100"/>
                </div>
            </div>
        </>
    );
}