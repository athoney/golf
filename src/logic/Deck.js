import React from "react";
import { useState } from "react";

const numbers = Array.from({ length: 48 }, (_, i) => i + 1);
const [deck, setDeck] = useState(numbers);
const [discard, setDiscard] = useState([49]);

export default function Deck(){
    
}