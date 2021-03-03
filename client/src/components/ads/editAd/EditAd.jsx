import React from 'react';
import AdForm from '../AdForm';
import * as Yup from 'yup';
import { useHistory, useRouteMatch } from 'react-router-dom';
import useEnhancedDispatch from '../../../utils/useEnhancedDispatch';
import { editAd, getAd } from '../../../actions/ad.action';
import { useSelector } from 'react-redux';

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

const EditAd = () => {
  const history = useHistory();
  const routeMatch = useRouteMatch();
  const dispatch = useEnhancedDispatch();

  const adId = +routeMatch.params.id;
  const ad = useSelector((state) => {
    return state.ad.list.find((ad) => ad.id === adId);
  });

  React.useEffect(() => {
    if (!Number.isInteger(adId)) {
      history.push('/'); //redirect to home if ad is not an integer
    }
    dispatch(getAd(adId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history, adId]);

  if (!ad) {
    return 'loading...';
  }

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

export default EditAd;
