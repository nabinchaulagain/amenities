import React from 'react';
import { Grid, TextField, Typography, Paper, Button } from '@material-ui/core';
import { Form, Formik, Field } from 'formik';
import ImageInputWithPreview from '../common/ImageInputWithPreview';
import previewImage from '../../assets/property_preview.png';
import propTypes from 'prop-types';

const AdForm = (props) => {
  return (
    <Grid container align="center" justify="center" style={{ marginTop: 10 }}>
      <Grid xl={3} lg={5} md={7} sm={10} xs={12} item>
        <Paper style={{ padding: '16px 32px' }}>
          <Typography variant="h4" component="h2" style={{ margin: '16px 0' }}>
            {props.formHeader}
          </Typography>
          <Formik
            initialValues={{
              title: '',
              description: '',
              price: '',
              location: '',
              image: ''
            }}
            validationSchema={props.validationSchema}
            onSubmit={async (values) => {}}
            validateOnBlur={false}
            validateOnChange={false}
          >
            {({
              isSubmitting,
              setFieldValue,
              values,
              errors,
              setFieldError
            }) => {
              return (
                <Form>
                  <AdTextFeild
                    name="title"
                    label="Title"
                    error={errors.title}
                  />
                  <AdTextFeild
                    name="price"
                    label="Price"
                    helperText={errors.price}
                  />
                  <AdTextFeild
                    name="location"
                    label="Location"
                    helperText={errors.location}
                  />
                  <ImageInputWithPreview
                    image={values.image ? values.image : previewImage}
                    onChange={(ev) => {
                      const file = ev.target.files[0];
                      if (
                        !['image/jpeg', 'image/png', 'image/jpg'].includes(
                          file.type
                        )
                      ) {
                        setFieldError(
                          'image',
                          'file must be an image(jpg or png)'
                        );
                        return;
                      }
                      if (file.size > 2000000) {
                        setFieldError('image', 'image must be less than 2Mb');
                        return;
                      }

                      setFieldValue('image', file);
                    }}
                    error={errors['image']}
                  />
                  <AdTextFeild
                    name="description"
                    label="Description"
                    error={errors.description}
                    rows={8}
                    multiline
                  />
                  <Button
                    variant="contained"
                    color={props.submitBtnColor}
                    disabled={isSubmitting}
                    type="submit"
                  >
                    {props.submitBtnText}
                  </Button>
                </Form>
              );
            }}
          </Formik>
        </Paper>
      </Grid>
    </Grid>
  );
};

const AdTextFeild = ({ label, name, error, ...props }) => {
  return (
    <Field
      autocomplete="off"
      variant="outlined"
      name={name}
      margin="dense"
      as={TextField}
      label={label}
      fullWidth={true}
      error={Boolean(error)}
      helperText={error}
      {...props}
    />
  );
};

AdForm.propTypes = {
  formHeader: propTypes.string.isRequired,
  validationSchema: propTypes.object.isRequired,
  submitBtnColor: propTypes.string,
  submitBtnText: propTypes.string.isRequired
};

AdForm.defaultProps = {
  submitBtnColor: 'primary'
};

export default AdForm;
