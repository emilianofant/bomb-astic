import Core from './core';
import { Board } from './types';

describe('Core class tests', () => {
  const core = new Core();

  test('Core Game class returns it`s status', () => {
    expect(core.getIsRunning()).toBe(false);
  });

  describe('Board creation', () => {
    test('Board creation method returns a Matrix / Array of Array', () => {
      expect(core.createBoard(1, 1)).toStrictEqual([[0]]);
    });

    test('Board creation method returns a 3x3 Matrix / Array of Array', () => {
      expect(core.createBoard(3, 3)).toStrictEqual([
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ]);
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
          if (boardWithBomb[x][y] === 1) {
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
      const [x, y] = core._createBombPosition(2, 1);

      expect(x).toBeLessThan(3);
      expect(y).toBeLessThan(1);
    });
  });
});
