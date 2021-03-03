import { Container, Grid, Typography, Button } from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAds } from '../../../actions/ad.action';
import AdCard from './AdCard';
import Link from '../../common/Link';

const Home = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getAds());
  }, [dispatch]);

  const ads = useSelector((state) => state.ad.list);

  return (
    <Container maxWidth="lg" align="center">
      <Container align="right" className="top-btn-container">
        <Link to="/ads/create">
          <Button variant="contained" color="primary">
            Create ad
          </Button>
        </Link>
      </Container>
      <Typography variant="h4" component="h2" className="heading">
        Recent ads
      </Typography>
      <Grid container>
        {ads.map((ad) => {
          return (
            <div key={ad.id} className="ad-card-wrapper">
              <AdCard {...ad} />
            </div>
          );
        })}
      </Grid>
    </Container>
  );
};

export default Home;
