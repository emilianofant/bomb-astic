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
  const [game, setGame] = useState(new Game(w, h, bombsAmount));
  const [board, setBoard] = useState<Board>([]);
  const [hasInit, setHasInit] = useState<boolean>(false);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [amountOfFlags, setAmountOfFlags] = useState<number>(0);
  const [remainingBombs, setRemainingBombs] = useState<number>(bombsAmount);

  const handleOnRevealAction = (x: number, y: number) => {
    const updatedBoard = game.pickSquare(x, y, board);
    setBoard({ ...updatedBoard });
  };

  const handleOnFlagCell = (x: number, y: number) => {
    game.toggleFlaggedCell(x, y, board);
    setAmountOfFlags(board[y][x].isFlagged ? amountOfFlags + 1 : amountOfFlags - 1);
    setBoard({ ...board });
  };

  const onRetryClick = () => {
    setGame(new Game(w, h, bombsAmount));
    setHasInit(false);
  };

  useEffect(() => {
    setIsRunning(game.getIsRunning());
    if (!hasInit) {
      game.setBoardValues(game.getBoard());
      setHasInit(true);
    }
    setBoard(game.getBoard());
    setRemainingBombs(bombsAmount - amountOfFlags);
  }, [game, board, hasInit, bombsAmount, amountOfFlags]);

  return (
    <>
      <h2>{appContext.message}</h2>
      {isRunning ? (
        <div className="board">
          <span>Amount of bombs: {bombsAmount}</span>
          <span>Amount of bombs flagged: {remainingBombs}</span>
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
      ) : (
        <div className="ui icon message">
          <i className="bomb icon"></i>
          <div className="content">
            <h3>Game Over</h3>
            <button className="ui button blue" onClick={onRetryClick}>
              Try again!
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default GameContainer;
