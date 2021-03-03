import '../App.css';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './ads/home/Home';
import Login from './auth/Login';
import Signup from './auth/Signup';
import CreateAd from './ads/createAd/CreateAd';
import Navbar from './Navbar';
import { useDispatch } from 'react-redux';
import { updateAuthStatus } from '../actions/auth.actions';
import EditAd from './ads/editAd/EditAd';
import DeleteAd from './ads/deleteAd/DeleteAd';
import Ad from './ads/ad/Ad';

const App = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(updateAuthStatus());
  }, [dispatch]);
  return (
    <BrowserRouter>
      <Navbar></Navbar>
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
        <Route path="/ads/create" exact>
          <CreateAd />
        </Route>
        <Route path="/ads/:id(\d+)" exact>
          <Ad />
        </Route>
        <Route path="/ads/:id(\d+)/edit" exact>
          <EditAd />
        </Route>
        <Route path="/ads/:id(\d+)/delete" exact>
          <DeleteAd />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
