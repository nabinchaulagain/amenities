import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000';

export const setAPIAuthToken = () => {
  if (localStorage.getItem('authToken')) {
    axios.defaults.headers['Authorization'] = localStorage.getItem('authToken');
  }
};

export const deleteAPIAuthToken = () => {
  localStorage.removeItem('authToken');
};

setAPIAuthToken();

export default axios;
