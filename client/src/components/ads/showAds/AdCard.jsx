import { Card, Typography, Container } from '@material-ui/core';
import React from 'react';
import Link from '../../common/Link';

const AdCard = ({ id, title, price, image }) => {
  return (
    <Card className="ad-card" elevation={2}>
      <Typography variant="h5" component="h3">
        <Link to={`/ads/${id}`} color="inherit">
          {title}
        </Link>
      </Typography>
      <Container className="image-container">
        <img src={image} alt={title} />
      </Container>
      <Typography variant="body1" component="div">
        Rs. {price}
      </Typography>
    </Card>
  );
};
export default AdCard;
