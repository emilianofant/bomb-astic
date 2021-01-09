export type Board = Array<Array<BoardCell>>;

export type BoardCell = {
  type: squareContentTypes;
  value: number | null;
};

export type Tuple = Array<number>;

export enum squareContentTypes {
  EMPTY = 0,
  BOMB,
  DISCOVERED,
}

// @todo: change for a better name
export interface IBoardStatus {
  bombsCount: number;
  bombsPositions: Array<Tuple>;
  emptyPositions: Array<Tuple>;
}
