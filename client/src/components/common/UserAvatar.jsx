import React from 'react';
import { Avatar } from '@material-ui/core';

const UserAvatar = ({ user }) => {
  return (
    <Avatar color="primary">{user.username.charAt(0).toUpperCase()}</Avatar>
  );
};

export default UserAvatar;
