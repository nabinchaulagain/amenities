import { Container, Button } from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAds } from '../../../actions/ad.action';
import Link from '../../common/Link';
import AdList from './AdList';
import AdSearch from './AdSearch';

const Home = () => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getAds());
  }, [dispatch]);

  const ads = useSelector((state) => {
    return state.ad.list.filter((ad) =>
      ad.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <Container maxWidth="lg" align="center">
      <Container align="right" className="top-btn-container">
        <Link to="/ads/create">
          <Button variant="contained" color="primary">
            Create ad
          </Button>
        </Link>
      </Container>
      <AdSearch
        onChange={(ev) => {
          setSearchQuery(ev.target.value);
        }}
      />
      {ads.length !== 0 && <AdList ads={ads} />}
      {ads.length === 0 && <>No results found</>}
    </Container>
  );
};

export default Home;
