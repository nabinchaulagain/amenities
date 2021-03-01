import api, { deleteAPIAuthToken, setAPIAuthToken } from '../api';

export const LOGOUT = 'LOGOUT';
export const UPDATE_AUTH_STATUS = 'UPDATE_AUTH_STATUS';

export const login = (formData) => {
  return async () => {
    const res = await api.post('/api/auth/login', formData);
    localStorage.setItem('authToken', res.data.token);
    setAPIAuthToken();
  };
};

export const signup = (formData) => {
  return () => {
    return api.post('/api/auth/signup', formData);
  };
};

export const logout = () => {
  localStorage.removeItem('authToken');
  deleteAPIAuthToken();
  return {
    type: LOGOUT
  };
};

export const updateAuthStatus = () => {
  return async (dispatch) => {
    const res = await api.get('/api/auth');
    dispatch({ type: UPDATE_AUTH_STATUS, payload: res.data });
  };
};
