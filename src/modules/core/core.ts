import { Board, squareContentTypes, Tuple } from '../../types.d';

/**
 * Core class is the main class that contains the definitions
 * and other stuff required for the game to run.
 */
class Core {
  isRunning: boolean;

  constructor() {
    this.isRunning = false;
  }
  /**
   * Returns the "running" status.
   *
   * @returns boolean
   */
  getIsRunning(): boolean {
    return this.isRunning;
  }
  /**
   * Function to create the Matrix/Board
   *
   * @param  {number} xLength  The -x dimension of the board.
   * @param  {number} yLength  The -y dimension of the board.
   * @returns Board
   */
  createBoard(xLength: number, yLength: number): Board {
    const result = [];

    for (let i = 0; i < yLength; i++) {
      const row = [];
      for (let y = 0; y < xLength; y++) {
        row.push({ type: squareContentTypes.EMPTY, value: null, isFlagged: false });
      }
      result.push(row);
    }

    return result;
  }
  /**
   * Function to create bomb positions according to the amount of bombs
   * that are set into the board.
   *
   * @param  {number} amountOfBombs  The specific amount of bombs to create.
   * @param  {Board}  board          The current board where to place the bombs.
   * @returns Array
   */
  randomizeBombsPlacements(amountOfBombs: number, board: Board): Board {
    const xLength = board[0].length;
    const yLength = board.length;
    const res: Array<Tuple> = this._getListRandomPositions(xLength, yLength, amountOfBombs);

    res.forEach((t) => {
      board[t[1]][t[0]] = { type: squareContentTypes.BOMB, value: null, isFlagged: false };
    });

    return board;
  }
  /**
   * Function to get the value of a specific cell.
   *
   * @param  {Board}         board  The board/matrix being used.
   * @param  {Array<number>} pos    The x and y coordinates,
   * @returns squareContentTypes
   */
  getPositionValue(board: Board, pos: Array<number>): squareContentTypes {
    return board[pos[0]][pos[1]].type;
  }
  /**
   * Function to create a tuple with (x,y) position where a bomb
   * could be placed in the board.
   *
   * @param  {number} xCap  Limit for the x-axis position.
   * @param  {number} yCap  Limit for the y-axis position.
   * @returns Array
   */
  _createRandomPosition(xCap: number, yCap: number): Array<number> {
    return [this._getRandomNumberUpTo(xCap), this._getRandomNumberUpTo(yCap)];
  }
  /**
   * Function to create a Random integer number with a cap
   * provided by parameter.
   *
   * @param  {number} cap
   */
  _getRandomNumberUpTo(cap: number): number {
    return Math.floor(Math.random() * cap);
  }
  /**
   * Function to create an array of UNIQUE Tuples with a specific amount defined.
   *
   * @param  {number} xCap    The Board x length max value.
   * @param  {number} yCap    The Board y length max value.
   * @param  {number} amount  The amount of tuples to create.
   * @returns Array
   */
  _getListRandomPositions(xCap: number, yCap: number, amount: number): Array<Tuple> {
    const randomPos: Array<Tuple> = [];

    while (randomPos.length < amount) {
      const newRandTuple = this._createRandomPosition(xCap, yCap);

      if (
        !randomPos.some((r: Array<number>) => r[0] === newRandTuple[0] && r[1] === newRandTuple[1])
      ) {
        randomPos.push(newRandTuple);
      }
    }

    return randomPos;
  }
}

export default Core;
