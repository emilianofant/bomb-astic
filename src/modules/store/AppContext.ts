import React from 'react';

type CtxType = {
  message: string;
};

const AppContext = React.createContext<CtxType>({
  message: 'appContext',
});

export default AppContext;
