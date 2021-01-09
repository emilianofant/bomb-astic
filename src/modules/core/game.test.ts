import { Board, squareContentTypes } from './types.d';
import Game from './game';

describe('[Game class] - Capabilities atomic/specific test', () => {
  let bombs: number;
  let _newGame: Game;
  let _gameBoard: Board;

  beforeAll(() => {
    bombs = 3;
    _newGame = new Game(3, 4, bombs);
    _gameBoard = _newGame.getBoard();
  });

  test('Game is running', () => {
    expect(_newGame.getIsRunning()).toBe(true);
  });

  test('Board is 3 x 4', () => {
    const ySize = _gameBoard.length;
    const xSize = _gameBoard[0].length;

    expect(xSize).toBe(3);
    expect(ySize).toBe(4);
  });

  test('Board has 3 bombs', () => {
    const { bombsCount } = _newGame.findBombEmptyPositions(_gameBoard);

    expect(bombsCount).toBe(bombs);
  });

  describe('Get Surronding squares', () => {
    const _gamePickSurronding = Game.prototype.getPickSurronding;
    const mat = [
      [
        { type: 2, value: null },
        { type: 0, value: null },
        { type: 1, value: null },
        { type: 0, value: null },
      ],
      [
        { type: 1, value: null },
        { type: 0, value: null },
        { type: 1, value: null },
        { type: 0, value: null },
      ],
      [
        { type: 0, value: null },
        { type: 0, value: null },
        { type: 0, value: null },
        { type: 0, value: null },
      ],
      [
        { type: 0, value: null },
        { type: 0, value: null },
        { type: 1, value: null },
        { type: 0, value: null },
      ],
    ];

    const { bombsCount, emptyPositions } = _gamePickSurronding(1, 1, mat);

    test('It contanins 3 bombs', () => {
      expect(bombsCount).toBe(3);
    });

    test('It find 4 empty squares', () => {
      expect(emptyPositions.length).toBe(4);
    });

    test('It find 4 empty squares', () => {
      expect(emptyPositions.sort()).toEqual(
        [
          [1, 0],
          [0, 2],
          [1, 2],
          [2, 2],
        ].sort(),
      );
    });
  });

  describe('Get Surronding squares from an edge', () => {
    const _gamePickSurronding = Game.prototype.getPickSurronding;
    const mat = [
      [
        { type: 3, value: null },
        { type: 0, value: null },
        { type: 1, value: null },
        { type: 0, value: null },
      ],
      [
        { type: 1, value: null },
        { type: 0, value: null },
        { type: 0, value: null },
        { type: 0, value: null },
      ],
      [
        { type: 0, value: null },
        { type: 0, value: null },
        { type: 0, value: null },
        { type: 0, value: null },
      ],
      [
        { type: 0, value: null },
        { type: 0, value: null },
        { type: 0, value: null },
        { type: 0, value: null },
      ],
    ];

    const { bombsCount, emptyPositions } = _gamePickSurronding(0, 2, mat);

    test('It contanins 1 bombs', () => {
      expect(bombsCount).toBe(1);
    });

    test('It find 4 empty squares', () => {
      expect(emptyPositions.length).toBe(4);
      expect(emptyPositions.sort()).toEqual(
        [
          [1, 1],
          [1, 2],
          [1, 3],
          [0, 3],
        ].sort(),
      );
    });
  });

  describe.only('Set the expected board values', () => {
    /*
     *  [1,1,0,0]     [0,0,1,0]
     *  [1,0,0,0]  => [0,3,1,0]
     *  [0,0,0,0]     [1,1,0,0]
     */

    const mat = [
      [
        { type: 1, value: null },
        { type: 1, value: null },
        { type: 0, value: null },
        { type: 0, value: null },
      ],
      [
        { type: 1, value: null },
        { type: 0, value: null },
        { type: 0, value: null },
        { type: 0, value: null },
      ],
      [
        { type: 0, value: null },
        { type: 0, value: null },
        { type: 0, value: null },
        { type: 0, value: null },
      ],
    ];

    expect(Game.prototype.setBoardValues(mat)).toEqual([
      [
        { type: 1, value: null },
        { type: 1, value: null },
        { type: 0, value: 1 },
        { type: 0, value: 0 },
      ],
      [
        { type: 1, value: null },
        { type: 0, value: 3 },
        { type: 0, value: 1 },
        { type: 0, value: 0 },
      ],
      [
        { type: 0, value: 1 },
        { type: 0, value: 1 },
        { type: 0, value: 0 },
        { type: 0, value: 0 },
      ],
    ]);
  });
});

describe('Simple Game flow', () => {
  const bombs = 3;
  const _simpleGame = new Game(3, 4, bombs);
  const _gameBoard = _simpleGame.getBoard();
  const { bombsPositions, emptyPositions } = _simpleGame.findBombEmptyPositions(_gameBoard);

  test('Game is running', () => {
    expect(_simpleGame.getIsRunning()).toBe(true);
  });

  test('Select an empty square', () => {
    const emptyPos = emptyPositions[0];
    expect(_gameBoard[emptyPos[1]][emptyPos[0]].type).toBe(squareContentTypes.EMPTY);
  });

  test('The previous empty square is now discovered', () => {
    const [emptyPos] = emptyPositions;
    const boardSnapshot = _simpleGame.pickSquare(emptyPos[0], emptyPos[1], _gameBoard);

    expect(boardSnapshot[emptyPos[1]][emptyPos[0]].type).toBe(squareContentTypes.DISCOVERED);
  });

  test('Select a bomb square', () => {
    const [bombPos] = bombsPositions;

    expect(_gameBoard[bombPos[1]][bombPos[0]].type).toBe(squareContentTypes.BOMB);
  });

  test('Game is not running anymore', () => {
    const [bombPos] = bombsPositions;

    _simpleGame.pickSquare(bombPos[0], bombPos[1], _gameBoard);
    expect(_simpleGame.getIsRunning()).toBe(false);
  });
});
