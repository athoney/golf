import "./scores.css";


export default function Scores({ screenHeight, game, show}) {


    return (
        <>

            <div id="mySidenav" className="sidenav">
                <button href="#" id="scores" type="button" className="btn" data-bs-toggle="offcanvas" data-bs-target="#leader-board" style={{ top: screenHeight - 21 }}>Scores</button>
            </div>

            <div className={`offcanvas offcanvas-start ${(show ? 'show' : null)}`} tabIndex="-1" id="leader-board" aria-labelledby="leader-board-label">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="leader-board-label">Scores</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Hole</th>
                                <th scope="col">{game.golferOne}</th>
                                <th scope="col">{game.golferTwo}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                game.scores.map((hole) => {
                                    if (game.currentHole === hole.hole) {
                                        return (
                                            <tr key={hole.hole} className="table-success">
                                                <th scope="row">{hole.hole}</th>
                                                <td>{hole.playerOne}</td>
                                                <td>{hole.playerTwo}</td>
                                            </tr>
                                        )
                                    }
                                    return (
                                        <tr key={hole.hole}>
                                            <th scope="row">{hole.hole}</th>
                                            <td>{hole.playerOne}</td>
                                            <td>{hole.playerTwo}</td>
                                        </tr>)
                                })
                            }
                            <tr>
                                <th scope="row">Total</th>
                                <td>
                                    {
                                        game.scores.map((hole) => {
                                            return hole.playerOne
                                        }).reduce((total, score) => {
                                            if (score === null) {
                                                return total + 0;
                                            } else {
                                                return total + score;
                                            }
                                        })
                                    }
                                </td>
                                <td>
                                {
                                        game.scores.map((hole) => {
                                            return hole.playerTwo
                                        }).reduce((total, score) => {
                                            if (score === null) {
                                                return total + 0;
                                            } else {
                                                return total + score;
                                            }
                                        })
                                    }
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}