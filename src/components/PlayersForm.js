import "./playersform.css"
import React, {useState} from "react";

export default function PlayerForms({startGame}) {

    const [inputs, setInputs] = useState({});

    const handleChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setInputs(values => ({...values, [name]: value}))
    }

    function handleSubmit(e){
        e.preventDefault();
        if (inputs.playerOne === undefined || inputs.playerTwo === undefined){
            startGame("Player One", "Player Two");
        } else {
            startGame(inputs.playerOne, inputs.playerTwo);
        }
    }

    return (
        <div className="players-form mx-auto">
            <form onSubmit={handleSubmit} >
                <div className="mb-3 text-start">
                    <label className="form-label">Golfer One</label>
                    <input type="text" name="playerOne" value={inputs.playerOne || ""} className="form-control" onChange={handleChange}/>
                </div>
                <div className="mb-3 text-start">
                    <label className="form-label">Golfer Two</label>
                    <input type="text" name="playerTwo" value={inputs.playerTwo || ""} className="form-control"  onChange={handleChange}/>
                </div>
                <button type="submit"  className="btn btn-success"> Tee time!</button>
            </form>

        </div>
    );
}