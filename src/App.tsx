import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Dashboard, MainMenu, Game } from './modules/';
import './App.scss';
import AppProvider from './modules/store/AppProvider';

function App(): JSX.Element {
  return (
    <AppProvider>
      <div className="App">
        <Router>
          <div>
            <ul>
              <li>
                <Link to="/">Main Menu</Link>
              </li>
              <li>
                <Link to="/Game">Game</Link>
              </li>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
            </ul>
          </div>
          <Switch>
            <Route exact path="/">
              <MainMenu />
            </Route>
            <Route path="/game">
              <Game />
            </Route>
            <Route path="/dashboard">
              <Dashboard />
            </Route>
          </Switch>
        </Router>
      </div>
    </AppProvider>
  );
}

export default App;
