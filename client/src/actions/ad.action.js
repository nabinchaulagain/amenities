import api from '../api';

export const ADD_AD = 'ADD_AD';
export const EDIT_AD = 'EDIT_AD';
export const REMOVE_AD = 'REMOVE_AD';
export const GET_AD = 'GET_AD';
export const GET_ADS = 'GET_ADS';

export const addAd = (data) => {
  return async (dispatch) => {
    const res = await api.post('/api/ads', data);
    dispatch({ type: ADD_AD, payload: res.data.ad });
  };
};

export const removeAd = (id) => {
  return async (dispatch) => {
    await api.delete(`/api/ads/${id}`);
    dispatch({ type: REMOVE_AD, payload: id });
  };
};

export const editAd = (id, data) => {
  return async (dispatch) => {
    const res = await api.patch(`/api/ads/${id}`, data);
    dispatch({
      type: EDIT_AD,
      payload: {
        id,
        ad: res.ad
      }
    });
  };
};

export const getAd = (id) => {
  return async (dispatch) => {
    const res = await api.get(`/api/ads/${id}`);
    dispatch({ type: GET_AD, payload: res.data });
  };
};

export const getAds = () => {
  return async (dispatch) => {
    const res = await api.get('/api/ads');
    dispatch({ type: GET_ADS, payload: res.data });
  };
};
