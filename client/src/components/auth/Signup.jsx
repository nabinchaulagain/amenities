import React from 'react';
import { Grid, Paper } from '@material-ui/core';
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
  return (
    <Grid container alignItems="center" justify="center" className="auth-grid">
      <Grid item lg={4} md={8} sm={10} xs={12}>
        <Paper className="auth-form-wrapper">
          <AuthForm
            validationSchema={signupSchema}
            initialValues={initialValues}
            actionBtnColor="secondary"
            actionBtnText="Signup"
            validate={(values) => {
              if (values.password !== values.rePassword) {
                return {
                  rePassword: "password didn't match"
                };
              }
            }}
            onSubmit={(values, { setSubmitting, setErrors }) => {
              console.log(values);
              setSubmitting(false);
            }}
            bottomNav={
              <>
                Already have an account? <Link to="/login">Login</Link>
              </>
            }
          ></AuthForm>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Signup;
