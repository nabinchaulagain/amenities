import { Container, Typography, Grid, Box } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { getAd } from '../../../actions/ad.action';
import useEnhancedDispatch from '../../../utils/useEnhancedDispatch';
import AdControls from './AdControls';
import AdInfo from './AdInfo';

const Ad = () => {
  const match = useRouteMatch();
  const adId = +match.params.id;
  const dispatch = useEnhancedDispatch();

  const ad = useSelector((state) => state.ad.list.find((ad) => ad.id === adId));
  const userId = useSelector((state) => state.auth.user.id);

  React.useEffect(() => {
    dispatch(getAd(adId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adId]);

  if (!ad || !ad.user) {
    return null;
  }
  return (
    <Container maxWidth="lg" style={{ marginTop: 16 }}>
      <Grid container>
        <Grid item md={4} lg={3} xs={12}>
          <Container align="center" className="image-container">
            <img src={ad.image} alt={ad.title} />
          </Container>
        </Grid>
        <Grid item md={8} lg={9} xs={12}>
          <Typography variant="h4" component="h2" className="header">
            {ad.title}
          </Typography>
          <AdInfo {...ad} />
        </Grid>
        <Typography variant="h5" component="h3">
          Property description
        </Typography>
        <Container>
          <Box mt={2} mb={2} component="div">
            {ad.description}
          </Box>
        </Container>
      </Grid>
      {ad.user.id === userId && <AdControls id={ad.id} />}
    </Container>
  );
};

export default Ad;
