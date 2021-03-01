import React from 'react';
import MuiLink from '@material-ui/core/Link';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';

const LinkEl = ({ to, children, underline, color }) => {
  return (
    <MuiLink underline={underline} component={Link} to={to}>
      {children}
    </MuiLink>
  );
};

LinkEl.propTypes = {
  to: propTypes.string.isRequired
};

LinkEl.defaultProps = {
  underline: 'hover'
};

export default LinkEl;
