import React from 'react';
import { Grid, Box, ButtonGroup, Button } from '@material-ui/core';
import { SkipNext, SkipPrevious } from '@material-ui/icons';
import AdCard from './AdCard';

const ADS_PER_PAGE = 3;

const AdList = ({ ads }) => {
  const [pageNum, setPageNum] = React.useState(0);
  const adsToShow = ads.slice(
    pageNum * ADS_PER_PAGE,
    pageNum * ADS_PER_PAGE + ADS_PER_PAGE
  );
  return (
    <>
      <Grid container justify="center">
        {adsToShow.map((ad) => {
          return (
            <Grid key={ad.id} className="ad-card-wrapper">
              <AdCard {...ad} />
            </Grid>
          );
        })}
      </Grid>
      <Box mt={2}>
        <Pagination
          pageNum={pageNum}
          maxPage={Math.floor((ads.length - 1 + 0.0000001) / ADS_PER_PAGE)}
          setPageNum={setPageNum}
        />
      </Box>
    </>
  );
};

const Pagination = ({ setPageNum, maxPage, pageNum }) => {
  return (
    <ButtonGroup>
      <Button
        variant="text"
        disabled={pageNum === 0}
        onClick={() => setPageNum(pageNum - 1)}
      >
        <SkipPrevious />
      </Button>
      <Button color="inherit" variant="text">
        {pageNum + 1}
      </Button>
      <Button
        variant="text"
        disabled={pageNum === maxPage}
        onClick={() => setPageNum(pageNum + 1)}
      >
        <SkipNext />
      </Button>
    </ButtonGroup>
  );
};

export default AdList;
