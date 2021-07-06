import ReactDOM from "react-dom";
import React from "react";
import './index.css'

function Square(props) {

        return (
            <button className="square"
                    onClick={ () => props.onClick()}
            >
                {props.value}
            </button>
        );
    }

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stateSquares: Array(9).fill(null),
            stateXIsNext: true,

        };
    }
    handleClick(i) {
        const localSquares = this.state.stateSquares.slice();
        if(calculateWinner(localSquares) || localSquares[i]) {
            return;
        }
        localSquares[i] = this.state.stateXIsNext ? 'X' : 'O';
        this.setState({
            stateSquares: localSquares,
            stateXIsNext: !this.state.stateXIsNext,

        })

    }
    renderSquare(i) {
        return <Square value={this.state.stateSquares[i]}
        onClick={() => this.handleClick(i) }
        />;
    }

    render() {
        const winner = calculateWinner(this.state.stateSquares);
        let status;
        if(winner) {
            status = 'Congratulations ' + (winner.localeCompare('X') ? 'Player 2' : 'Player 1') + '! You are the awesome winner of this awesome tic-toe game';
        } else {
            status = 'Next player: ' + (this.state.stateXIsNext ? 'Player 1' : 'Player 2');
        }

        return (
            <div>
                <div className="status">{status}</div>
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
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
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
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}