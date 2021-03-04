import '../App.css';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './ads/showAds/Home';
import Login from './auth/Login';
import Signup from './auth/Signup';
import CreateAd from './ads/createAd/CreateAd';
import Navbar from './Navbar';
import { useDispatch } from 'react-redux';
import { updateAuthStatus } from '../actions/auth.actions';
import EditAd from './ads/editAd/EditAd';
import DeleteAd from './ads/deleteAd/DeleteAd';
import Ad from './ads/showAd/Ad';
import PrivateRoute from './common/PrivateRoute';

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
        <PrivateRoute path="/ads/create" exact>
          <CreateAd />
        </PrivateRoute>
        <Route path="/ads/:id(\d+)" exact>
          <Ad />
        </Route>
        <PrivateRoute path="/ads/:id(\d+)/edit" exact>
          <EditAd />
        </PrivateRoute>
        <PrivateRoute path="/ads/:id(\d+)/delete" exact>
          <DeleteAd />
        </PrivateRoute>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
