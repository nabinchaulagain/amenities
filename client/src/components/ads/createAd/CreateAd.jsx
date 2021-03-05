import React from 'react';
import AdForm from '../AdForm';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import useEnhancedDispatch from '../../../hooks/useEnhancedDispatch';
import { addAd } from '../../../actions/ad.action';
import { editAdSchema } from '../editAd/EditAd';
import useTitle from '../../../hooks/useTitle';

const createAdSchema = editAdSchema.shape({
  image: Yup.mixed().required()
});

const initialValues = {
  title: '',
  description: '',
  price: '',
  location: '',
  image: ''
};

const CreateAd = () => {
  const dispatch = useEnhancedDispatch();
  const history = useHistory();
  useTitle('Create advertisement');

  return (
    <AdForm
      formHeader="Create Property Advertisement"
      validationSchema={createAdSchema}
      submitBtnText="Create ad"
      initialValues={initialValues}
      onSubmit={async (formValues) => {
        await dispatch(addAd(formValues));
        history.push('/');
      }}
    ></AdForm>
  );
};

export default CreateAd;
