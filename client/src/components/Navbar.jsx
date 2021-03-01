import React from 'react';
import Link from './common/Link';
import UserAvatar from './common/UserAvatar';
import { AppBar, Toolbar, Box, Button, IconButton } from '@material-ui/core';
import Logo from './common/Logo';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/auth.actions';
import { useHistory } from 'react-router-dom';

const Navbar = () => {
  const { isLoading, isLoggedIn, user } = useSelector((state) => {
    return state.auth;
  });
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <AppBar color="default" position="static">
      <Toolbar>
        <Link to="/">
          <Logo></Logo>
        </Link>

        {!isLoading && (
          <Box ml="auto">
            {!isLoggedIn && (
              <>
                <Link to="/login" underline="none">
                  <Button>Login</Button>
                </Link>
                <Link to="/signup" underline="none">
                  <Button>Sign up</Button>
                </Link>
              </>
            )}
            {isLoggedIn && (
              <>
                <IconButton>
                  <UserAvatar user={user} />
                </IconButton>
                <Button
                  onClick={() => {
                    dispatch(logout());
                    history.replace('/');
                  }}
                >
                  Logout
                </Button>
              </>
            )}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
