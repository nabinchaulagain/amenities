import { Typography } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';

const Home = () => {
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  return (
    <>
      <Typography variant="h3" align="center">
        {!isLoggedIn && <>Home</>}
        {isLoggedIn && <>Logged in as {user.username}</>}
      </Typography>
    </>
  );
};

export default Home;
