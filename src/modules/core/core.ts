import { Board } from './types';

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
   * @returns Array
   */
  createBoard(xLength: number, yLength: number): Board {
    const result = [];

    for (let i = 0; i < xLength; i++) {
      const row = [];
      for (let y = 0; y < yLength; y++) {
        row.push(0);
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
  randomizeBombsPlacements(amountOfBombs: number, board: Board): Array<Array<number>> {
    const xLength = board.length;
    const yLength = board[0].length;
    const res: Array<Array<number>> = [];

    while (res.length < amountOfBombs) {
      const newRandTuple = this._createBombPosition(xLength, yLength);

      // In the board, 1 defines a square with a bomb.
      if (!res.some((r: Array<number>) => r[0] === newRandTuple[0] && r[1] === newRandTuple[1])) {
        res.push(newRandTuple);
        board[newRandTuple[0]][newRandTuple[1]] = 1;
      }
    }

    return board;
  }
  /**
   * Function to create a tuple with (x,y) position where a bomb
   * could be placed in the board.
   *
   * @param  {number} xCap  Limit for the x-axis position.
   * @param  {number} yCap  Limit for the y-axis position.
   * @returns Array
   */
  _createBombPosition(xCap: number, yCap: number): Array<number> {
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
}

export default Core;
