import React from 'react';
import * as Yup from 'yup';
import AuthForm from './AuthForm';
import Link from '../common/Link';
import { login, updateAuthStatus } from '../../actions/auth.actions';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

const loginSchem = Yup.object().shape({
  username: Yup.string().min(3).max(25).required(),
  password: Yup.string().min(5).max(30).required()
});

const initialValues = {
  username: '',
  password: ''
};

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const handleSubmit = async (values) => {
    await dispatch(login(values));
    await dispatch(updateAuthStatus());
    history.push('/');
  };
  return (
    <AuthForm
      validationSchema={loginSchem}
      initialValues={initialValues}
      actionBtnText="Login"
      actionBtnColor="primary"
      onSubmit={handleSubmit}
      bottomNav={
        <>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </>
      }
    ></AuthForm>
  );
};

export default Login;
