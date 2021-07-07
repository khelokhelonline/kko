import ReactDOM from "react-dom";
import React from "react";
import './index.css'

function Square(props) {

        return (
            <button className="square" onClick={props.onClick}>
                {props.value}
            </button>
        );
    }

class Board extends React.Component {
    renderSquare(i) {
        return (
	<Square value={this.props.stateSquares[i]}
        onClick={() => this.props.onClick(i) }
        />
      );
    }

    render() {
        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [
	    {
	    stateSquares: Array(9).fill(null)
	    }
	    ],
            stateXIsNext: true,
            stepNumber: 0,
        };
    }
    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const localSquares = current.stateSquares.slice();
        if(calculateWinner(localSquares) || localSquares[i]) {
            return;
        }
        localSquares[i] = this.state.stateXIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([
	    {stateSquares: localSquares
	    }
	    ]),
            stateXIsNext: !this.state.stateXIsNext,
            stepNumber: history.length,

        })

    }
    jumpTo(step) {
        this.setState({
            stepNumber: step,
            stateXIsNext: (step %2 ) === 0
        });
    }
    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber]
        const winner = calculateWinner(current.stateSquares);
        const moves = history.map((step, move) => {
            const desc = 'Go to game start';
            if(move > 0) {
                return (<></>
                );
            }
            return (
                    <button onClick={() => this.jumpTo(0)}>{desc}</button>
            );
        });
        let status;
        if(winner) {
            status = 'Winner: Player ' + (winner.localeCompare('X') ? '2(' : '1(') + winner + ')';
        } else {
            status = 'Next player: ' + (this.state.stateXIsNext ? 'Player 1(X)' : 'Player 2(O)');
        }
        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        stateSquares={current.stateSquares}
                        onClick={i => this.handleClick(i)}

                    />
                </div>
                <div className="game-info">
                    <div><cite><q><b>Tic-tac-toe</b></q></cite></div>
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
                <div className="footer">
                    <div>Author: Anil & Pooja Pandey</div>
                    <div>© 2021 APP Software Technologies.<br />All rights reserved.</div>
                    <div>Contact us: <address>khelokhelonline@gmail.com</address></div>
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById("root")
);

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}