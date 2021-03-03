import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
const { logout } = require('../actions/auth.actions');

const useEnhancedDispatch = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  return async (action) => {
    try {
      await dispatch(action);
    } catch (err) {
      const { response } = err;
      // if unauthenticated
      if (response) {
        switch (response.status) {
          case 401:
            await dispatch(logout());
            history.push('/login');
            break;
          case 404:
            history.push('/');
            break;
          default:
            throw err;
        }
      } else {
        // throw original error if not anything other than 401 error
        throw err;
      }
    }
  };
};

export default useEnhancedDispatch;
