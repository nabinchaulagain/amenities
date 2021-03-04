import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children, ...props }) => {
  const { isLoading, isLoggedIn } = useSelector((state) => ({
    isLoggedIn: state.auth.isLoggedIn,
    isLoading: state.auth.isLoading
  }));
  if (isLoading) {
    return <Route>{null}</Route>; // render route with nothing so that 404 page doesn't show
  } else if (!isLoggedIn) {
    return <Redirect to="/login"></Redirect>;
  }
  return <Route {...props}>{children}</Route>;
};

export default PrivateRoute;
