import React from 'react';
import AdForm from '../AdForm';
import * as Yup from 'yup';

const adValidationSchema = Yup.object().shape({
  title: Yup.string().min(3).max(30).required(),
  price: Yup.number('price must be a number').min(1).required(),
  location: Yup.string().min(5).max(60).required(),
  description: Yup.string().min(10).required(),
  image: Yup.mixed().required()
});

const CreateAd = () => {
  return (
    <AdForm
      formHeader="Create Property Advertisement"
      validationSchema={adValidationSchema}
      submitBtnText="Create ad"
    ></AdForm>
  );
};

export default CreateAd;
