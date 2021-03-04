import {
  ADD_AD,
  GET_ADS,
  GET_AD,
  REMOVE_AD,
  EDIT_AD
} from '../actions/ad.action';

const INITIAL_STATE = {
  list: []
};

const adReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_AD:
      return { ...state, list: [...state.list, action.payload] };

    case EDIT_AD:
      const listWithEditedAd = state.list.map((ad) => {
        if (ad.id === action.payload.id) {
          return action.payload.ad;
        }
        return ad;
      });
      return { ...state, list: listWithEditedAd };
    case GET_AD:
      let didAddToList = false;
      const listWithAd = state.list.map((ad) => {
        if (ad.id === action.payload.id) {
          didAddToList = true;
          return action.payload;
        }
        return ad;
      });
      if (!didAddToList) {
        listWithAd.push(action.payload);
      }
      return { ...state, list: listWithAd };

    case GET_ADS:
      return { ...state, list: action.payload };
    case REMOVE_AD:
      return {
        ...state,
        list: state.list.filter((ad) => ad.id !== action.payload)
      };
    default:
      return state;
  }
};

export default adReducer;
