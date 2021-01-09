import React, { FunctionComponent, useContext, useEffect, useState } from 'react';
import AppContext from '../../store/AppContext';
import { Board } from '../../core/types.d';
import './board.scss';
import Cell from '../cell';
import Game from '../../core/game';

const GameContainer: FunctionComponent = () => {
  const appContext = useContext(AppContext);
  const [game, setGame] = useState(new Game(8, 8, 10));
  const [board, setBoard] = useState<Board>([]);

  useEffect(() => {
    setBoard(game.getBoard());
  }, [game]);

  return (
    <div>
      <h2>This is the Game!</h2>
      <span>{appContext.message}</span>
      {board.length > 0 ? (
        <div>
          {board.map((r) => {
            return (
              <div key={board.indexOf(r)} className="board_row">
                {r.map((c) => (
                  <Cell value={c} key={r.indexOf(c)}></Cell>
                ))}
                <br />
              </div>
            );
          })}
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default GameContainer;
