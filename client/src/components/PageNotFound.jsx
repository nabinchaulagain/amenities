import React from 'react';
import { Box, Typography } from '@material-ui/core';

const PageNotFound = () => {
  return (
    <Box mt={8} align="center">
      <Typography variant="h1">404</Typography>
      <Typography variant="h3">Page not found</Typography>
    </Box>
  );
};

export default PageNotFound;
