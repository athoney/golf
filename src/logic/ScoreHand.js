import { useState } from "react";

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
    // Check for pairs
    pairs.forEach((pair) => {
        if (pair[0] !== pair[1]) {
            score += pair[0] + pair[1];
        } else if (pair[0] === -2 && pair[1] === -2) {
            score -= 4;
        }
    });
    return score;
}

function ScoreHand(playerOne, playerTwo){
    console.log("ScoreHand")
    let scores = [];
    // convert object to array of card values
    console.log(playerOne.cards);
    const playerOneCards = playerOne.cards.map((card) => mapCard(card.value));
    const playerTwoCards = playerTwo.cards.map((card) => mapCard(card.value));
    console.log("playerOneCards: ", playerOneCards);
    console.log("playerTwoCards: ", playerTwoCards);
    scores.push(score(playerOneCards));
    scores.push(score(playerTwoCards));
    return scores;
}

export default ScoreHand;