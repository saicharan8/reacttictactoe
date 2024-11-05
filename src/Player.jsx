import { useState } from "react";

export default function Player({ name, symbol, isActive, savePlayer }) {
    const [playerName, setPlayerName] = useState(name);
    const [isEditing, SetIsEditing] = useState(false);
    function handleEditing() {
        SetIsEditing(isEditing => !isEditing);
        savePlayer(symbol, playerName);
    }
    function handleChange(event) {
        setPlayerName(event.target.value);
    }

    let playerNameHtml = <span className="player-name">{playerName}</span>

    if (isEditing) {
        playerNameHtml = <input type="text" required value={playerName} onChange={handleChange} />
    }

    return (
        <li className={isActive ? "active" : undefined}>
            <span className='players'>
                {playerNameHtml}
                <span className='player-symbol'>{symbol}</span>
            </span>
            <button onClick={() => handleEditing()}>{!isEditing ? 'Edit' : 'Save'}</button>
        </li>
    );
}