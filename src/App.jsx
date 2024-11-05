import { useState } from 'react';
import './App.css';
import HeaderClass from './HeaderClass';
import Player from './Player';
import GameBoard from './GameBoard';
import Log from './Log';
import { WINNING_COMBINATIONS } from './winning-combinations';
import GameOver from './GameOver';

const INIT_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

const PLAYERS = {
  'X': 'Player 1',
  'O': 'Player 2'
};

function deriveSymbol(gameTurns) {
  let currentPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O';
  }
  return currentPlayer;
}

function findWinner(newBoard) {
  let winner = null;
  for (const comb of WINNING_COMBINATIONS) {
    const firstSS = newBoard[comb[0].row][comb[0].column];
    const secondSS = newBoard[comb[1].row][comb[1].column];
    const thirdSS = newBoard[comb[2].row][comb[2].column];
    if (firstSS && firstSS === secondSS && firstSS === thirdSS) {
      winner = firstSS;
    }
  }
  return winner;
}

function deriveGameBoard(gameTurns) {
  let newBoard = [...INIT_GAME_BOARD.map(arr => [...arr])];
  for (const turn of gameTurns) {
    const { square, player } = turn;
    newBoard[square.row][square.col] = player;
  }
  return newBoard;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [player, setplayers] = useState(PLAYERS);
  const activeSymbol = deriveSymbol(gameTurns);
  const newBoard = deriveGameBoard(gameTurns);
  const winner = findWinner(newBoard);
  const hasDraw = gameTurns.length === 9 && !winner;

  function isActivePLayer(rowIndex, colIndex) {
    setGameTurns(prevTurns => {
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: deriveSymbol(prevTurns) },
        ...prevTurns
      ];
      return updatedTurns;
    })
  }
  function handleRestart() {
    setGameTurns([]);
  }
  function handlePlayers(symbol, newName) {
    setplayers(prevPlayer => {
      return {
        ...prevPlayer,
        [symbol]: newName
      }
    })
  }
  return (
    <>
      <HeaderClass />
      <main>
        <div id='game-container'>
          <ol id='players' className='highlight-player'>
            <Player name={PLAYERS['X']} symbol="X" isActive={activeSymbol === "X"} savePlayer={handlePlayers} />
            <Player name={PLAYERS['O']} symbol="O" isActive={activeSymbol === "O"} savePlayer={handlePlayers} />
          </ol>
          {(winner || hasDraw) && <GameOver winner={winner} name={player[winner]} handleRematchMethod={handleRestart} />}
          <GameBoard onSelectSquare={isActivePLayer} newBoard={newBoard} />
        </div>
      </main>
      <Log turns={gameTurns} />
    </>
  );
}

export default App;
