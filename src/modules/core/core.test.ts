import Core from './core';
import { Board, squareContentTypes } from './types.d';

describe('Core class tests', () => {
  const core = new Core();

  test('Core Game class returns it`s status', () => {
    expect(core.getIsRunning()).toBe(false);
  });

  describe('Board creation', () => {
    test('Board creation method returns a Matrix / Array of Array', () => {
      expect(core.createBoard(1, 1)).toStrictEqual([[{ type: 0, value: null }]]);
    });

    test('Board creation method returns a 3x3 Matrix / Array of Array', () => {
      const board: Board = [
        [
          { type: 0, value: null },
          { type: 0, value: null },
          { type: 0, value: null },
        ],
        [
          { type: 0, value: null },
          { type: 0, value: null },
          { type: 0, value: null },
        ],
        [
          { type: 0, value: null },
          { type: 0, value: null },
          { type: 0, value: null },
        ],
      ];

      expect(core.createBoard(3, 3)).toStrictEqual(board);
    });

    test('Add bombs to the board', () => {
      const definedBombAmount = 3;
      const xLength = 3;
      const yLength = 3;
      const board: Board = core.createBoard(xLength, yLength);
      const boardWithBomb = core.randomizeBombsPlacements(definedBombAmount, board);
      let bombCount = 0;

      for (let x = 0; x < xLength; x++) {
        for (let y = 0; y < yLength; y++) {
          if (boardWithBomb[x][y].type === squareContentTypes.BOMB) {
            bombCount++;
          }
        }
      }

      expect(bombCount).toBe(definedBombAmount);
    });
  });

  describe('Utils functions', () => {
    test('Gets a random number', () => {
      expect(core._getRandomNumberUpTo(5)).toBeLessThan(6);
      expect(core._getRandomNumberUpTo(5)).toBeLessThan(6);
      expect(core._getRandomNumberUpTo(5)).toBeLessThan(6);
      expect(core._getRandomNumberUpTo(5)).toBeLessThan(6);
      expect(core._getRandomNumberUpTo(5)).toBeLessThan(6);
    });

    test('Get a random tuple', () => {
      const [x, y] = core._createRandomPosition(2, 1);

      expect(x).toBeLessThan(3);
      expect(y).toBeLessThan(1);
    });

    describe('Get a list of 3 random uniques Tuples', () => {
      const tuplesList = core._getListRandomPositions(3, 3, 3);
      expect(tuplesList.length).toBe(3);
    });
  });
});

describe('Square / positions actions', () => {
  const core = new Core();

  describe('Given a 3x3 board with 2 bombs', (): void => {
    const board: Board = [
      [
        { type: 0, value: null },
        { type: 0, value: null },
        { type: 0, value: null },
      ],
      [
        { type: 0, value: null },
        { type: 1, value: null },
        { type: 0, value: null },
      ],
      [
        { type: 1, value: null },
        { type: 0, value: null },
        { type: 0, value: null },
      ],
    ];

    test('Get an empty position', () => {
      expect(core.getPositionValue(board, [0, 1])).toBe(squareContentTypes.EMPTY);
    });

    test('Get a bomb position', () => {
      expect(core.getPositionValue(board, [2, 0])).toBe(squareContentTypes.BOMB);
    });
  });
});
