import AppContext from './AppContext';

const AppProvider: React.FC = ({ children }) => {
  const ctx = { message: 'Bomb-astic' };

  return <AppContext.Provider value={ctx}>{children}</AppContext.Provider>;
};

export default AppProvider;
