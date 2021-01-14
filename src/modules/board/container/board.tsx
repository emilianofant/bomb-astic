import { FunctionComponent, useContext, useEffect, useState } from 'react';
import AppContext from '../../store/AppContext';
import { Board, IBoardConfiguration } from '../../core/types.d';
import './board.scss';
import Cell from '../cell';
import Game from '../../core/game';
import { RouteComponentProps } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/ban-types
type GameProps = RouteComponentProps<{}, {}, IBoardConfiguration>;

const GameContainer: FunctionComponent<GameProps> = ({ location }) => {
  const appContext = useContext(AppContext);
  const boardConfiguration = { ...location.state };
  const { w, h } = boardConfiguration.boardDimensions;

  const [bombsAmount] = useState<number>(
    Math.floor(w * h * boardConfiguration.selectedDifficulty.factor),
  );
  const [game] = useState(new Game(w, h, bombsAmount));
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
      <h2>Bomb-astic</h2>
      <span>
        {appContext.message} - {isRunning ? 'game on' : 'game over'}
      </span>
      <span>Amount of bombs: {bombsAmount}</span>
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
