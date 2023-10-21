import React from 'react';
import { useState } from 'react';
import "./card.css";
import { useWindowDimensions } from 'react-native';


export default function Card({player, cardHeight, data, handleClick, card}) {
    const { height, width } = useWindowDimensions();
    const [isFlipped, setIsFlipped] = useState(false);

    function click(e){
        const card = parseInt(e.target.getAttribute("value"))
        console.log(card)
        handleClick(card)
    }

    let img = "back"   
    if (card.flipped) {
        img = card.value;
    }

    return (
        <div>
            <img className={player} src={require(`../static/img/${img}.png`)} alt="Card" value={card.value} height={(cardHeight * .9)} onClick={click}/>
        </div>
    );
}