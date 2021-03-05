import { Paper, Typography, Button, Box } from '@material-ui/core';
import React from 'react';
import useEnhancedDispatch from '../../../hooks/useEnhancedDispatch';
import { getAd, removeAd } from '../../../actions/ad.action';
import { useHistory, useRouteMatch } from 'react-router-dom';
import Link from '../../common/Link';
import withAdProtected from '../../../hoc/withAdProtected';
import useTitle from '../../../hooks/useTitle';

const DeleteAd = ({ ad }) => {
  const match = useRouteMatch();
  const history = useHistory();
  const dispatch = useEnhancedDispatch();
  useTitle('Delete ad');

  const adId = +match.params.id;

  React.useEffect(() => {
    dispatch(getAd(adId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adId]);

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

export default withAdProtected(DeleteAd);
