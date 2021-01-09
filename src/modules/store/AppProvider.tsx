import { useEffect, useState } from 'react';
import AppContext from './AppContext';

const AppProvider: React.FC = ({ children }) => {
  const ctx = { message: 'test', game: null };

  return <AppContext.Provider value={ctx}>{children}</AppContext.Provider>;
};

export default AppProvider;
