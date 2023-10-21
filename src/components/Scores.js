import "./scores.css";


export default function Scores({ screenHeight }) {

    const fake_game = {
        currentHole: 5,
        scores: [
            {
                hole: 1,
                playerOne: 3,
                playerTwo: 4
            },
            {
                hole: 2,
                playerOne: 2,
                playerTwo: 5
            },
            {
                hole: 3,
                playerOne: 3,
                playerTwo: 4
            },
            {
                hole: 4,
                playerOne: 2,
                playerTwo: 5
            },
            {
                hole: 5,
                playerOne: null,
                playerTwo: null
            },
            {
                hole: 6,
                playerOne: null,
                playerTwo: null
            },
            {
                hole: 7,
                playerOne: null,
                playerTwo: null
            },
            {
                hole: 8,
                playerOne: null,
                playerTwo: null
            },
            {
                hole: 9,
                playerOne: null,
                playerTwo: null
            }
        ]
    }

    console.log(screenHeight)
    return (
        <>

            <div id="mySidenav" className="sidenav">
                <button href="#" id="scores" type="button" className="btn" data-bs-toggle="offcanvas" data-bs-target="#leader-board" style={{ top: screenHeight - 21 }}>Scores</button>
            </div>

            <div className="offcanvas offcanvas-start" tabindex="-1" id="leader-board" aria-labelledby="leader-board-label">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="leader-board-label">Scores</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Hole</th>
                                <th scope="col">Player One</th>
                                <th scope="col">Player Two</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                fake_game.scores.map((hole) => {
                                    if (fake_game.currentHole === hole.hole) {
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
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}