import { FunctionComponent } from 'react';
import { BoardCell, squareContentTypes, Tuple } from '../core/types.d';

interface ICellProps {
  boardCell: BoardCell;
  coordinate: Tuple;
  onRevealAction: (x: number, y: number) => void;
}

const Cell: FunctionComponent<ICellProps> = (props) => {
  const { boardCell, coordinate, onRevealAction } = props;

  const onCellClick = () => {
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

  return (
    <div className="board_cell" onClick={onCellClick}>
      {boardCell.type === squareContentTypes.DISCOVERED ? props.boardCell.value : ''}
    </div>
  );
};

export default Cell;
