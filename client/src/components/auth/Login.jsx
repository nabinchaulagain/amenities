import React from 'react';
import { Grid, Paper } from '@material-ui/core';
import * as Yup from 'yup';
import AuthForm from './AuthForm';
import Link from '../common/Link';

const loginSchem = Yup.object().shape({
  username: Yup.string().min(3).max(25).required(),
  password: Yup.string().min(5).max(30).required()
});

const initialValues = {
  username: '',
  password: ''
};

const Login = () => {
  return (
    <Grid container alignItems="center" justify="center" className="auth-grid">
      <Grid item lg={4} md={8} sm={10} xs={12}>
        <Paper className="auth-form-wrapper">
          <AuthForm
            validationSchema={loginSchem}
            initialValues={initialValues}
            actionBtnText="Login"
            actionBtnColor="primary"
            onSubmit={(values, { setSubmitting, setErrors }) => {
              console.log(values);
              setSubmitting(false);
            }}
            bottomNav={
              <>
                Don't have an account? <Link to="/signup">Sign up</Link>
              </>
            }
          ></AuthForm>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Login;
