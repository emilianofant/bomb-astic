import Core from './core';
import { Board, IBoardStatus, squareContentTypes, Tuple } from './types.d';

class Game {
  private _isRunning: boolean;
  private _board: Board;
  private _core: Core;

  constructor(xSize: number, ySize: number, bombsAmount: number) {
    this._isRunning = true;
    this._core = new Core();
    const _newBoard = this._core.createBoard(xSize, ySize);
    this._board = this._core.randomizeBombsPlacements(bombsAmount, _newBoard);
  }
  /**
   * Getter to return if the Game is running.
   *
   * @returns boolean
   */
  getIsRunning(): boolean {
    return this._isRunning;
  }
  /**
   * Function to return the Board
   *
   * @returns Board
   */
  getBoard(): Board {
    return this._board;
  }
  /**
   * Function to set a board.
   *
   * @param  {Board} board
   * @returns void
   */
  setBoard(board: Board): void {
    this._board = board;
  }
  /**
   * Action of selecting a specific square in the board, and get the
   * actual value/result.
   *
   * @param  {number} x  The x-axis coordinate.
   * @param  {number} y  The y-axis coordinate.
   * @returns squareContentTypes
   */
  pickSquare(x: number, y: number, board: Board): Board {
    const squareContent = board[y][x];

    if (squareContent.type === squareContentTypes.BOMB) {
      this._isRunning = false;
    }

    if (squareContent.type === squareContentTypes.EMPTY) {
      board[y][x].type = squareContentTypes.DISCOVERED;

      const { bombsCount, emptyPositions } = this.getPickSurronding(x, y, board);
      if (bombsCount > 0) {
        // return bombs count
      } else if (emptyPositions.length > 0) {
        emptyPositions.forEach((p) => {
          this.pickSquare(p[0], p[1], board);
        });
      }
    }

    return board;
  }
  /**
   * Function to get the surrondings positions of a specific
   * position, gathering the empty ones and the amount of bombs.
   *
   * @param  {number} x      The x-axis coordinate.
   * @param  {number} y      The y-axis coordinate.
   * @param  {Board}  board  The matrix representation of the board.
   * @returns IBoardStatus
   */
  getPickSurronding(x: number, y: number, board: Board): IBoardStatus {
    const xLength = board[0].length;
    const yLength = board.length;

    const emptyPositions: Array<Tuple> = [];
    let bombsCount = 0;
    const surrondingPositions = [
      [x - 1, y - 1],
      [x, y - 1],
      [x + 1, y - 1],
      [x - 1, y],
      [x + 1, y],
      [x - 1, y + 1],
      [x, y + 1],
      [x + 1, y + 1],
    ];

    surrondingPositions.forEach((c: Tuple) => {
      if (c[0] >= 0 && c[0] < xLength && c[1] >= 0 && c[1] < yLength) {
        switch (board[c[1]][c[0]].type) {
          case squareContentTypes.BOMB:
            bombsCount++;
            break;
          case squareContentTypes.EMPTY:
            emptyPositions.push([c[0], c[1]]);
            break;
          case squareContentTypes.DISCOVERED:
          default:
            break;
        }
      }
    });

    return { bombsCount, emptyPositions, bombsPositions: [] };
  }
  /**
   * This function iterates over each position in the board to get
   * and set the actual value that the frontend requires to show how
   * many bombs are near.
   *
   * @param  {Board} board  The game's board.
   * @returns Board
   */
  setBoardValues(board: Board): Board {
    const xSize = board[0].length;
    const ySize = board.length;

    for (let y = 0; y < ySize; y++) {
      for (let x = 0; x < xSize; x++) {
        if (board[y][x].type === squareContentTypes.EMPTY) {
          const { bombsCount } = this.getPickSurronding(x, y, board);
          board[y][x] = {
            type: squareContentTypes.EMPTY,
            value: bombsCount,
          };
        }
      }
    }

    return board;
  }
  /**
   * Helper function to detemine the amount of bombs, theirs (x,y) positions and
   * the empty (x,y) positions from the board.
   *
   * @param  {number} xSize  The board's x length.
   * @param  {number} ySize  The board's y length.
   * @param  {Board}  board  The board to analyse.
   * @returns IBoardStatus
   */
  findBombEmptyPositions(board: Board): IBoardStatus {
    const xSize = board.length;
    const ySize = board[0].length;
    let bombsCount = 0;
    const bombsPositions = [];
    const emptyPositions = [];

    for (let y = 0; y < ySize; y++) {
      for (let x = 0; x < xSize; x++) {
        if (board[y][x] && board[y][x].type === squareContentTypes.BOMB) {
          bombsCount++;
          bombsPositions.push([x, y]);
        } else {
          emptyPositions.push([x, y]);
        }
      }
    }

    return { bombsCount, bombsPositions, emptyPositions };
  }
}

export default Game;
