import React from 'react';
import MuiLink from '@material-ui/core/Link';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';

const LinkEl = ({ to, children }) => {
  return (
    <MuiLink underline="hover" component={Link} to={to}>
      {children}
    </MuiLink>
  );
};

LinkEl.propTypes = {
  to: propTypes.string.isRequired
};

export default LinkEl;
