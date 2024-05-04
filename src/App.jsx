import { useState } from 'react';
import './App.css';
import Board from './components/Board';
import Restart from './components/Restart';
import ScoreBoard from './components/ScoreBoard';

const App = () => {
  const winningPositions = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];
  const [turn, setTurn] = useState('X');
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [winningSquares, setWinningSquares] = useState([])
  const [score, setScore] = useState({
    X: 0,
    O: 0,
  });

  const checkForWhinner =   newSquares => {
    for(let i = 0; i < winningPositions.length; i++) {
      const [a,b,c] = winningPositions[i];
      if(newSquares[a] && newSquares[a] === newSquares[b] && newSquares[a] === newSquares[c]) {
        endGame(newSquares[a], winningPositions[i]);
        return
      };
    };
    if(!newSquares.includes(null)) {
      endGame(null, Array.from(Array(10).keys()));
      return
    };
    setTurn(turn === 'X' ? 'O' : 'X');
  };

  const handleClick = square => {
    let newSquares = [...squares];
    newSquares.splice(square, 1, turn);
    setSquares(newSquares);
    checkForWhinner(newSquares);
  };

  const endGame = (result, winningPositions) => {
    setTurn(null);
    if (result !== null) {
      setScore({
        ...score,
        [result] : score[result] + 1,
      });
    };
    setWinningSquares(winningPositions);
  };

  return (
    <div className='container'>
      <h1>TA-TE-TI</h1>
      <Board winningSquares={winningSquares} turn={turn} squares={squares} onClick={handleClick}/>
      <ScoreBoard scoreX={score.X}  scoreO={score.O} />
      <Restart setTurn={setTurn} setSquares={setSquares} setWinningSquares={setWinningSquares}/>
    </div>
  );
}

export default App;
