import React from 'react';
import useEnhancedDispatch from '../utils/useEnhancedDispatch';
import { useSelector } from 'react-redux';
import { useRouteMatch, Redirect } from 'react-router-dom';
import { getAd } from '../actions/ad.action';

const withAdProtected = (Component) => {
  return () => {
    const match = useRouteMatch();
    const dispatch = useEnhancedDispatch();

    const adId = +match.params.id;
    const ad = useSelector((state) =>
      state.ad.list.find((ad) => ad.id === adId)
    );
    const userId = useSelector((state) => {
      return state.auth.user && state.auth.user.id;
    });

    React.useEffect(() => {
      dispatch(getAd(adId));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [adId]);

    if (!ad) {
      return null;
    }

    if (ad.user && ad.user.userId !== userId) {
      return <Redirect to="/" />;
    }
    return <Component ad={ad} />;
  };
};

export default withAdProtected;
