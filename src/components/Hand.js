import Card from "./Card";

export default function Hand(props) {

    function cardFlipped(selectedCard) {
        let cardFlipped = false;
        props.data.cards.forEach((card) => {
            if ((card.value === selectedCard) && (card.flipped)) {
                cardFlipped = true;
            }
        })
        return cardFlipped;
    }

    function flipCard(turn, selectedCard) {
        props.setHand({
            turn: turn,
            turnCount: (props.data.turnCount + 1),
            cards: props.data.cards.map((card) => {
                if (card.value === selectedCard) {
                    return { value: selectedCard, flipped: true }
                } else {
                    return card
                }
            })
        });
    }

    function handleClick(selectedCard) {
        if (props.data.turn) {
            if ((props.data.turnCount === 0) && !cardFlipped(selectedCard)) {
                flipCard(true, selectedCard)
            } else if ((props.data.turnCount === 1) && !cardFlipped(selectedCard)) {
                // check which player
                if (props.player === "one") {
                    flipCard(true, selectedCard);
                } else {
                    flipCard(false, selectedCard);
                }
            }
            if (props.selectedDiscard || props.selectedDeck) {
                if (props.selectedDiscard) {
                    // User wants to play the discard on flipped card
                    const newCard = props.playDiscard(selectedCard);
                    props.setHand({
                        turn: false,
                        turnCount: (props.data.turnCount + 1),
                        cards: props.data.cards.map((card) => {
                            if (card.value === selectedCard) {
                                return { value: newCard, flipped: true }
                            } else {
                                return card
                            }
                        })
                    });
                } else if (!cardFlipped(selectedCard)) {
                    flipCard(false, selectedCard);
                }
                props.changeTurn();

            }
        }
    }

    return (
        <div>
            <div className="row justify-content-center">

                {[...Array(3)].map((x, i) =>

                    <div key={i} className="col-3">
                        <Card card={props.data.cards[i]} player={props.player} cardHeight={(props.rowHeight) * .45} handleClick={handleClick} />
                    </div>
                )}

            </div>
            <div className="row justify-content-center">

                {[...Array(3)].map((x, i) =>

                    <div key={i} className="col-3">
                        <Card card={props.data.cards[i + 3]} player={props.player} cardHeight={(props.rowHeight) * .45} handleClick={handleClick} />
                    </div>
                )}

            </div>
        </div>
    );
}