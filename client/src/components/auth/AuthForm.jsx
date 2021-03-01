import React from 'react';
import Logo from '../common/Logo';
import { Formik, Form, Field } from 'formik';
import { Box, TextField, Button, Typography } from '@material-ui/core';
import propTypes from 'prop-types';

const formInputs = [
  { name: 'email', type: 'email', label: 'Email' },
  { name: 'username', type: 'text', label: 'Username' },
  { name: 'password', type: 'password', label: 'Password' },
  { name: 'rePassword', type: 'password', label: 'rePassword' }
];

const AuthForm = (props) => {
  return (
    <>
      <Box align="center">
        <Logo />
      </Box>
      <Formik
        initialValues={props.initialValues}
        validationSchema={props.validationSchema}
        validate={props.validate}
        onSubmit={props.onSubmit}
      >
        {({ isSubmitting, errors, touched }) => {
          return (
            <Form className="auth-form">
              {formInputs
                //filter form inputs to contain only inputs which are sent as props
                .filter(
                  (formInput) =>
                    props.initialValues[formInput.name] !== undefined &&
                    props.initialValues[formInput.name] !== null
                )
                //map form input schema to field element
                .map((formInput) => (
                  <Field
                    key={formInput.name}
                    as={TextField}
                    type={formInput.type}
                    name={formInput.name}
                    label={formInput.label}
                    error={Boolean(
                      touched[formInput.name] && errors[formInput.name]
                    )}
                    helperText={
                      touched[formInput.name] && errors[formInput.name]
                    }
                    variant="outlined"
                    margin="dense"
                    fullWidth={true}
                  />
                ))}
              <Button
                type="submit"
                variant="contained"
                color={props.actionBtnColor}
                disabled={isSubmitting}
              >
                {props.actionBtnText}
              </Button>
              <Typography
                variant="body2"
                align="center"
                className="auth-form-link-wrapper"
              >
                {props.bottomNav}
              </Typography>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

AuthForm.propTypes = {
  validationSchema: propTypes.object.isRequired,
  initialValues: propTypes.object.isRequired,
  onSubmit: propTypes.func.isRequired,
  validate: propTypes.func,
  actionBtnText: propTypes.string.isRequired,
  actionBtnColor: propTypes.string.isRequired,
  bottomNav: propTypes.element.isRequired
};

export default AuthForm;
