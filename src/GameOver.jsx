export default function GameOver({ winner, handleRematchMethod, name }) {
    return (
        <div id="game-over">
            <h2>Game Over</h2>
            {winner && <p>{name} won!</p>}
            {!winner && <p>It's a draw!</p>}
            <button onClick={handleRematchMethod}>Rematch!</button>
        </div>);
}