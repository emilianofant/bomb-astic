import React from 'react';

type CtxType = {
  message: string;
};

const AppContext = React.createContext<CtxType>({
  message: 'Bomb-astic',
});

export default AppContext;
