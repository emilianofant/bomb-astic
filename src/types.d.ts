export type Board = Array<Array<BoardCell>>;

export type BoardCell = {
  type: squareContentTypes;
  value: number | null;
  isFlagged?: boolean;
};

export type Tuple = Array<number>;

export enum squareContentTypes {
  EMPTY = 0,
  BOMB,
  DISCOVERED,
}

export interface IBoardStatus {
  bombsCount: number;
  bombsPositions: Array<Tuple>;
  emptyPositions: Array<Tuple>;
}

interface IDifficulty {
  name: string;
  factor: number;
}

interface IBoardConfiguration {
  boardDimensions: IBoardDimensions;
  selectedDifficulty: IDifficulty;
}

interface IBoardDimensions {
  w: number;
  h: number;
}

interface Score {
  id: string;
  startTime: string;
  endTime: string;
  difficulty: IDifficulty.name;
  totalTime: string;
  status: string;
}
