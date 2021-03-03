import { Box, Button, ButtonGroup } from '@material-ui/core';
import Link from '../../common/Link';

const AdControls = ({ id }) => {
  return (
    <Box mt={4} align="center">
      <ButtonGroup>
        <Link to={`/ads/${id}/edit`}>
          <Button variant="contained" color="primary" underline="none">
            Edit Ad
          </Button>
        </Link>
        <Link to={`/ads/${id}/delete`} underline="none">
          <Button variant="contained" color="secondary">
            Delete Ad
          </Button>
        </Link>
      </ButtonGroup>
    </Box>
  );
};

export default AdControls;
