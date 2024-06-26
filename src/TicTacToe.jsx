import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './Tictactoe.css';
import Confetti from 'react-confetti';

const ItemTypes = {
    PAWN: 'pawn',
};

function TicTacToe() {
    const [player1Color, setPlayer1Color] = useState('purple');
    const [player2Color, setPlayer2Color] = useState('cyan');
    const [board, setBoard] = useState(Array(9).fill(null));
    const [currentPlayer, setCurrentPlayer] = useState(1);
    const [gameStarted, setGameStarted] = useState(false);

    const handleColorChange = (player, color) => {
        if (player === 1) {
            setPlayer1Color(color);
        } else if (player === 2) {
            setPlayer2Color(color);
        }
    };

    const handleDrop = (index) => {
        if (!gameStarted) return;

        if (board[index] || calculateWinner(board) || isBoardFull()) return;

        const newBoard = [...board];
        newBoard[index] = currentPlayer === 1 ? player1Color : player2Color;
        setBoard(newBoard);
        setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
    };

    const startGame = () => {
        setGameStarted(true);
    };

    const renderPawns = (color, player) => {
        const pawns = [];
        const sizes = [20, 25, 30, 35, 40, 45, 50, 55];
        for (let i = 0; i < 8; i++) {
            pawns.push(<Pawn key={i} color={color} size={sizes[i]} />);
        }
        return pawns;
    };

    const calculateWinner = (board) => {
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
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }

        return null;
    };

    const isBoardFull = () => {
        return board.every((cell) => cell);
    };

    const renderBoard = () => {
        return board.map((cell, index) => (
            <Square key={index} index={index} onDrop={() => handleDrop(index)}>
                {cell && <Pawn color={cell} />}
            </Square>
        ));
    };

    const Pawn = ({ color, size }) => {
        const [{ isDragging }, drag] = useDrag({
            type: ItemTypes.PAWN,
            item: { color },
            collect: (monitor) => ({
                isDragging: !!monitor.isDragging(),
            }),
        });
    
        return (
            <div
                ref={drag}
                className={`pawn ${color}`}
                style={{ opacity: isDragging ? 0.5 : 1, width: size, height: size }}
            >
                {color}
            </div>
        );
    };
    
    const Square = ({ index, onDrop, children }) => {
        const [{ isOver }, drop] = useDrop({
            accept: ItemTypes.PAWN,
            drop: () => onDrop(index),
            collect: (monitor) => ({
                isOver: !!monitor.isOver(),
            }),
        });

        return (
            <div ref={drop} className={`cell ${isOver ? 'hover' : ''}`}>
                {children}
            </div>
        );
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="game-container">
                {!gameStarted && (
                    <div className="color-selection">
                        <h2>Player 1 Color</h2>
                        <select value={player1Color} onChange={(e) => handleColorChange(1, e.target.value)}>
                            <option value="purple">Purple</option>
                            <option value="cyan">Cyan</option>
                            <option value="yellow">Yellow</option>
                            <option value="red">Red</option>
                            <option value="green">Green</option>
                            <option value="orange">Orange</option>
                            <option value="pink">Pink</option>
                        </select>
                        <h2>Player 2 Color</h2>
                        <select value={player2Color} onChange={(e) => handleColorChange(2, e.target.value)}>
                            <option value="purple">Purple</option>
                            <option value="cyan">Cyan</option>
                            <option value="yellow">Yellow</option>
                            <option value="red">Red</option>
                            <option value="green">Green</option>
                            <option value="orange">Orange</option>
                            <option value="pink">Pink</option>
                        </select>
                        <button onClick={startGame}>Start Game</button>
                    </div>
                )}
                {gameStarted && (
                    <div className="board">
                        {renderBoard()}
                        <div className="player-pawns">
                            {renderPawns(player1Color, 1)}
                        </div>
                        <div className="player-pawns">
                            {renderPawns(player2Color, 2)}
                        </div>
                        {calculateWinner(board) && <div className="winner">Winner: {calculateWinner(board)}</div>}
                        {isBoardFull() && !calculateWinner(board) && <div className="draw">It's a draw!</div>}
                    </div>
                )}
                
            </div>
        </DndProvider>
    );
}

export default TicTacToe;
