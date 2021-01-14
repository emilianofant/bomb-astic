import { FunctionComponent, useEffect, useState } from 'react';
import { BoardCell, squareContentTypes, Tuple } from '../core/types.d';

interface ICellProps {
  boardCell: BoardCell;
  coordinate: Tuple;
  onRevealAction: (x: number, y: number) => void;
  onFlagCell: (x: number, y: number) => void;
}

const Cell: FunctionComponent<ICellProps> = (props) => {
  const { boardCell, coordinate, onRevealAction, onFlagCell } = props;

  const onCellClick = () => {
    if (boardCell.isFlagged) return;

    switch (boardCell.type) {
      case squareContentTypes.BOMB:
      case squareContentTypes.EMPTY:
        onRevealAction(coordinate[0], coordinate[1]);
        break;
      case squareContentTypes.DISCOVERED:
        break;
      default:
    }
  };

  const onCellRightClick = (event: any) => {
    event.preventDefault();
    onFlagCell(coordinate[0], coordinate[1]);
  };

  return (
    <div className="board_cell" onClick={onCellClick} onContextMenu={onCellRightClick}>
      {boardCell.type === squareContentTypes.DISCOVERED ? props.boardCell.value : ''}
      {boardCell.isFlagged ? 'F' : ''}
    </div>
  );
};

export default Cell;
