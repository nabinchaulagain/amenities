import React from 'react';
import Link from './common/Link';
import UserAvatar from './common/UserAvatar';
import { AppBar, Toolbar, IconButton, Box, Button } from '@material-ui/core';
import Logo from './common/Logo';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const { isLoading, isLoggedIn, user } = useSelector((state) => {
    return state.auth;
  });
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
              </>
            )}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
