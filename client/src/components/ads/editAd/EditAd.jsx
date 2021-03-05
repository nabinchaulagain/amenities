import React from 'react';
import AdForm from '../AdForm';
import * as Yup from 'yup';
import { useHistory, useRouteMatch } from 'react-router-dom';
import useEnhancedDispatch from '../../../hooks/useEnhancedDispatch';
import { editAd } from '../../../actions/ad.action';
import withAdProtected from '../../../hoc/withAdProtected';
import useTitle from '../../../hooks/useTitle';

export const editAdSchema = Yup.object().shape({
  title: Yup.string().min(3).max(30).required(),
  price: Yup.number()
    .integer()
    .typeError('price must be a number')
    .min(1)
    .required(),
  location: Yup.string().min(5).max(60).required(),
  description: Yup.string().min(6).required()
});

const EditAd = ({ ad }) => {
  const history = useHistory();
  const routeMatch = useRouteMatch();
  const dispatch = useEnhancedDispatch();
  useTitle('Edit ad');

  const adId = +routeMatch.params.id;
  return (
    <AdForm
      formHeader="Edit Property Advertisement"
      validationSchema={editAdSchema}
      initialValues={{
        title: ad.title,
        description: ad.description,
        price: +ad.price,
        location: ad.location,
        image: ad.image
      }}
      submitBtnText="Confirm changes"
      onSubmit={async (formValues) => {
        await dispatch(editAd(adId, formValues));
        history.push('/');
      }}
    ></AdForm>
  );
};

export default withAdProtected(EditAd);
