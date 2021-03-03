import { Paper, Typography, ButtonGroup, Button, Box } from '@material-ui/core';
import React from 'react';
import useEnhancedDispatch from '../../../utils/useEnhancedDispatch';
import { getAd, removeAd } from '../../../actions/ad.action';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Link from '../../common/Link';

const DeleteAd = () => {
  const match = useRouteMatch();
  const history = useHistory();
  const adId = +match.params.id;
  const dispatch = useEnhancedDispatch();
  const ad = useSelector((state) => state.ad.list.find((ad) => ad.id === adId));

  React.useEffect(() => {
    dispatch(getAd(adId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adId]);

  if (!ad) {
    return null;
  }
  return (
    <Box m={'auto'} mt={2} maxWidth={1000}>
      <Paper style={{ padding: 16 }} align="center">
        <Typography variant="h4" component="h2">
          Are you sure you want to remove "{ad.title}"
        </Typography>
        <Box mt={2} mb={2}>
          <Button
            variant="contained"
            color="primary"
            style={{ marginRight: 16 }}
            size="large"
            onClick={async () => {
              await dispatch(removeAd(adId));
              history.push('/');
            }}
          >
            Yes
          </Button>
          <Link to={`/ads/${adId}`}>
            <Button variant="contained" color="secondary" size="large">
              No
            </Button>
          </Link>
        </Box>
      </Paper>
    </Box>
  );
};

export default DeleteAd;
