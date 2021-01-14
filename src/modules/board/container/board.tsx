import { FunctionComponent, useContext, useEffect, useState } from 'react';
import AppContext from '../../store/AppContext';
import { Board } from '../../core/types.d';
import './board.scss';
import Cell from '../cell';
import Game from '../../core/game';

const GameContainer: FunctionComponent = () => {
  const appContext = useContext(AppContext);
  const [game] = useState(new Game(8, 8, 10));
  const [board, setBoard] = useState<Board>([]);
  const [hasInit, setHasInit] = useState<boolean>(false);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const handleOnRevealAction = (x: number, y: number) => {
    const updatedBoard = game.pickSquare(x, y, board);
    setBoard({ ...updatedBoard });
  };

  const handleOnFlagCell = (x: number, y: number) => {
    game.toggleFlaggedCell(x, y, board);
    setBoard({ ...board });
  };

  useEffect(() => {
    setIsRunning(game.getIsRunning());
    if (!hasInit) {
      game.setBoardValues(game.getBoard());
      setHasInit(true);
    }
    setBoard(game.getBoard());
  }, [game, board, hasInit]);

  return (
    <div className="board">
      <h2>This is the Game!</h2>
      <span>
        {appContext.message} - {isRunning ? 'game on' : 'game over'}
      </span>
      {board.length > 0 ? (
        <div className="board_wrapper">
          {board.map((r) => {
            return (
              <div key={board.indexOf(r)} className="board_row">
                {r.map((c) => (
                  <Cell
                    boardCell={c}
                    coordinate={[r.indexOf(c), board.indexOf(r)]}
                    key={r.indexOf(c)}
                    onRevealAction={handleOnRevealAction}
                    onFlagCell={handleOnFlagCell}
                  ></Cell>
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
