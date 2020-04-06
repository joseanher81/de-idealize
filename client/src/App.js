import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import {UserContext} from './contexts/userContexts';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/' component={LoginPage}/>
        <Route exact path='/signup' component={SignupPage}/>
      </Switch>
    </div>
  );
}

export default App;
