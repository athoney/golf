import "./deck.css";
import Card from "./Card";
import React from "react";
import { useState } from "react";

export default function Deck(props) {

    const [discardClass, setDiscardClass] = useState("");

    function handleClick(){
        console.log(props.discard[0]);
        if (discardClass === ""){
            setDiscardClass("selected")
            props.setSelectedDiscard(true);
        } else {
            setDiscardClass("")
            props.setSelectedDiscard(false);
        }
    }

    return (
        <div>
            <div className="row justify-content-center">
                <div className="col-4">
                    <img src={require("../static/img/49.png")} alt="Card" height={props.rowHeight * .81} onClick={props.flipDeckCard}/>
                </div>
                <div className="col-4">
                    <img className={discardClass} src={require(`../static/img/${props.discard[0]}.png`)} alt="Card" height={props.rowHeight * .81} onClick={handleClick}/>
                </div>
            </div>
        </div>
    );
}

