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

function scorePair(card1, card2) {
    if (card1 !== card2) {
        return card1 + card2;
    } else if (card1 === -2 && card2 === -2) {
        return -4;
    } else {
        return 0;
    }
}

function score(cards) {
    let score = 0;
    const pairs = zip(cards.slice(0, 3), cards.slice(3));
    // Check first four are identical
    if (pairs[0][0] === pairs[0][1] && pairs[1][0] === pairs[1][1] && pairs[0][0] === pairs[1][0]) {
        if (pairs[0][0] === -2) {
            score -= 28;
        } else {
            score -= 20;
        }
        score += scorePair(pairs[2][0], pairs[2][1]);
    } else if (pairs[1][0] === pairs [1][1] && pairs[2][0] === pairs[2][1] && pairs[1][0] === pairs[2][0]) {
        if (pairs[1][0] === -2) {
            score -= 28;
        } else {
            score -= 20;
        }
        score += scorePair(pairs[0][0], pairs[0][1]);
    } else {
        // Check for pairs
        pairs.forEach((pair) => {
            score += scorePair(pair[0], pair[1]);
        });
    }
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