import { FunctionComponent } from 'react';

interface ICellProps {
  value: number;
}

const Cell: FunctionComponent<ICellProps> = (props) => {
  return <div className="board_cell">{props.value}</div>;
};

export default Cell;
