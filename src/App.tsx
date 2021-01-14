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
          <div className="ui secondary pointing menu">
            <Link to="/" className="item">
              Main Menu
            </Link>
            <Link to="/Game" className="item">
              Game
            </Link>
            <Link to="/dashboard" className="item">
              Dashboard
            </Link>
          </div>
          <div className="ui segment mainSegment">
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
          </div>
        </Router>
      </div>
    </AppProvider>
  );
}

export default App;
