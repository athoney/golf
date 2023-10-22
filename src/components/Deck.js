import "./deck.css";
import React from "react";

export default function Deck(props) {

    function handleClick(){
        if (props.discardClass === ""){
            props.setSelectedDiscard(true);
        } else {
            props.setSelectedDiscard(false);
        }
    }

    return (
        <div>
            <div className="row justify-content-center">
                <div className="col-4">
                    <img src={require("../static/img/back.png")} alt="Card" height={props.rowHeight * .81} onClick={props.flipDeckCard}/>
                </div>
                <div className="col-4">
                    <img className={props.discardClass} src={require(`../static/img/${props.discard[0]}.png`)} alt="Card" height={props.rowHeight * .81} onClick={handleClick}/>
                </div>
            </div>
        </div>
    );
}

