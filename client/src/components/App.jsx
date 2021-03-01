import '../App.css';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './home/Home';
import Login from './auth/Login';
import Signup from './auth/Signup';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/login" exact>
          <Login />
        </Route>
        <Route path="/signup" exact>
          <Signup />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
