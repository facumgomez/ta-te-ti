import '../App.css'

const Restart = ({setTurn, setSquares, setWinningSquares}) => {
  let handleReset = () => {
    setTurn('X');
    setSquares(Array(9).fill(null));
    setWinningSquares([]);
  };
  
  return (
    <button className='buttonReset' onClick={handleReset}>Restart</button>
  );
}

export default Restart;