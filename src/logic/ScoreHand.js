
const zip = (a, b) => a.map((k, i) => [k, b[i]]);

function mapCard(card) {
    card = card % 13;
    switch (card) {
        case 11:
            return 10;
        case 12:
            return 30;
        case 0:
            return -2;
        default:
            return card;
    }
}

function score(cards) {
    let score = 0;
    const pairs = zip(cards.slice(0, 3), cards.slice(3));
    pairs.forEach((pair) => {
        if (pair[0] !== pair[1]) {
            score += 0;
        }
    });
}

function ScoreHand(playerOne, playerTwo){
    console.log("ScoreHand")
    // convert object to array of card values
    console.log(playerOne.cards);
    const playerOneCards = playerOne.cards.map((card) => mapCard(card.value));
    const playerTwoCards = playerTwo.cards.map((card) => mapCard(card.value));
    console.log("playerOneCards: ", playerOneCards);
    console.log("playerTwoCards: ", playerTwoCards);

}

export default ScoreHand;