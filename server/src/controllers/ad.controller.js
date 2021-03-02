const {
  createAd,
  getAd,
  updateAd,
  deleteAd,
  getAds
} = require('../services/ad.service');
const APIError = require('../utils/APIError');
const sendResponse = require('../utils/sendResponse');
const { deleteFromStorage } = require('../utils/uploadStorage');

const adController = {
  addAd: async (req, res, next) => {
    try {
      const adData = {
        ...req.body,
        image: req.file.location,
        ['user_id']: req.user.id
      };
      const newAd = await createAd(adData);
      sendResponse(res, {
        message: 'Succesfully added advertisement',
        ad: { ...req.body, ...newAd }
      });
    } catch (err) {
      next(err);
      deleteFromStorage(req.file.key);
    }
  },

  getAd: async (req, res, next) => {
    try {
      const ad = await getAd(+req.params.id);
      if (!ad) {
        throw new APIError({ message: 'Not found' }, 404);
      }
      sendResponse(res, ad);
    } catch (err) {
      next(err);
    }
  },

  getAds: async (req, res, next) => {
    try {
      const ads = await getAds();
      sendResponse(res, ads);
    } catch (err) {
      next(err);
    }
  },

  updateAd: async (req, res, next) => {
    try {
      const ad = await getAd(+req.params.id);
      const adData = {
        ...req.body,
        image: req.file.location
      };
      const updatedAd = await updateAd(+req.params.id, adData);
      sendResponse(res, {
        message: 'Updated advertisement',
        ad: { ...req.body, ...updatedAd }
      });
      deleteFromStorage(ad.image); // delete previous file
    } catch (err) {
      next(err);
      deleteFromStorage(req.file.key);
    }
  },

  deleteAd: async (req, res, next) => {
    try {
      const ad = await getAd(+req.params.id);
      await deleteAd(+req.params.id);
      sendResponse(res, { message: 'Deleted successfully' });
      deleteFromStorage(ad.image);
    } catch (err) {
      next(err);
    }
  }
};

module.exports = adController;
