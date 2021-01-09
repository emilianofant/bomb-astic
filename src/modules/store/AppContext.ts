import React from 'react';
import Game from '../core/game';

type CtxType = {
  message: string;
  game: Game | null;
};

const AppContext = React.createContext<CtxType>(undefined!);

export default AppContext;
