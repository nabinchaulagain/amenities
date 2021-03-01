import React from 'react';
import * as Yup from 'yup';
import AuthForm from './AuthForm';
import Link from '../common/Link';

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
  const validate = (values) => {
    if (values.password !== values.rePassword) {
      return {
        rePassword: "password didn't match"
      };
    }
  };

  const handleSubmit = (values) => {
    console.log(values);
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
