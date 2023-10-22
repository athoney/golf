import React from 'react';
import "./card.css";


export default function Card({player, cardHeight, data, handleClick, card}) {

    function click(e){
        const card = parseInt(e.target.getAttribute("value"))
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