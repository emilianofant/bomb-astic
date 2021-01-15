import React, { FunctionComponent } from 'react';
import { useState } from 'react';
import { IBoardDimensions, IDifficulty } from '../../../types.d';
import './mainMenu.scss';
import { useHistory } from 'react-router-dom';
import { GAME_DIFFICULTIES } from '../../../constants/constants';

const MainMenu: FunctionComponent = () => {
  const difficulties: IDifficulty[] = GAME_DIFFICULTIES;
  const [boardDimensions, setBoardDimensions] = useState<IBoardDimensions>({ w: 0, h: 0 });
  const [selectedDifficulty, setSelectedDifficulty] = useState<IDifficulty>(difficulties[0]);
  const history = useHistory();

  const handleSelectChange = (event: any) => {
    setSelectedDifficulty(
      difficulties.find((d) => d.name === event.target.value) || difficulties[0],
    );
  };

  const onStartGame = () => {
    if (boardDimensions.h < 3 || boardDimensions.w < 3) {
      alert('Invalid Board size: you need to set at least a board of 3x3');
    } else {
      history.push({
        pathname: '/Game',
        state: {
          selectedDifficulty,
          boardDimensions,
        },
      });
    }
  };

  return (
    <div className="mainMenu">
      <h2>Main Menu</h2>
      <ul>
        <li>New Game</li>
      </ul>
      <br />
      <div className="mainMenu_newGame ui form">
        <div className="grouped fields">
          <label>Select difficulty</label>
          <select
            className="ui fluid dropdown"
            onChange={handleSelectChange}
            value={selectedDifficulty.name}
          >
            {difficulties.map((d) => (
              <option value={d.name} key={d.name}>
                {d.name}
              </option>
            ))}
          </select>
        </div>
        <div className="inline field">
          <label>Height</label>
          <input
            type="number"
            value={boardDimensions.h}
            placeholder="Ex: 20"
            onChange={(e) => setBoardDimensions({ ...boardDimensions, h: Number(e.target.value) })}
          />
        </div>
        <div className="inline field">
          <label>Width</label>
          <input
            type="number"
            value={boardDimensions.w}
            placeholder="Ex: 10"
            onChange={(e) => setBoardDimensions({ ...boardDimensions, w: Number(e.target.value) })}
          />
        </div>
        <button className="big ui blue button" onClick={onStartGame}>
          Start game
        </button>
      </div>
    </div>
  );
};

export default MainMenu;
