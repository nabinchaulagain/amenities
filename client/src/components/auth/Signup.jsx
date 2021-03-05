import React from 'react';
import * as Yup from 'yup';
import AuthForm from './AuthForm';
import Link from '../common/Link';
import { signup } from '../../actions/auth.actions';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import useTitle from '../../hooks/useTitle';

const signupSchema = Yup.object().shape({
  username: Yup.string().min(3).max(25).required(),
  password: Yup.string().min(5).max(30).required(),
  email: Yup.string().email().required()
});

const initialValues = {
  email: '',
  username: '',
  password: '',
  rePassword: ''
};

const Signup = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  useTitle('Signup');

  const validate = (values) => {
    if (values.password !== values.rePassword) {
      return {
        rePassword: "password didn't match"
      };
    }
  };

  const handleSubmit = async (values) => {
    await dispatch(
      signup({
        username: values.username,
        password: values.password,
        email: values.email
      })
    );
    history.push('/login');
  };

  return (
    <AuthForm
      validationSchema={signupSchema}
      initialValues={initialValues}
      actionBtnColor="secondary"
      actionBtnText="Signup"
      validate={validate}
      onSubmit={handleSubmit}
      bottomNav={<BottomNav />}
    ></AuthForm>
  );
};

const BottomNav = () => (
  <>
    Already have an account? <Link to="/login">Login</Link>
  </>
);

export default Signup;
