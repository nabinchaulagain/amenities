import { List, ListItem } from '@material-ui/core';
import React from 'react';

const AdInfo = ({ location, price, user, created_at, views }) => {
  return (
    <List className="ad-info-list">
      <ListItem>Location: {location}</ListItem>
      <ListItem>Price: Rs. {price}</ListItem>
      <ListItem>
        Sold by: <a href={`mailto:${user.email}`}>{user.username}</a>
      </ListItem>
      <ListItem>Views: {views}</ListItem>
      <ListItem>
        Ad created on: {new Date(created_at).toLocaleDateString()}
      </ListItem>
    </List>
  );
};
export default AdInfo;
