const Router = require('express').Router;
const adController = require('../controllers/ad.controller');
const { upload } = require('../utils/upload');
const validateAd = require('../validators/ad.validator');
const requireAuth = require('../middlewares/requireAuth');
const verifyEntityOwner = require('../middlewares/verifyEntityOwner');
const verifyId = require('../middlewares/verifyId');

const router = Router();

// POST => /api/ad
router.post(
  '/',
  requireAuth,
  upload.single('image'),
  validateAd,
  adController.addAd
);

// PATCH => /api/ad/:id
router.patch(
  '/:id',
  requireAuth,
  verifyId,
  verifyEntityOwner('ads'),
  upload.single('image'),
  validateAd,
  adController.updateAd
);

// GET => /api/ad
router.get('/', adController.getAds);

// GET => /api/ad/:id
router.get('/:id', verifyId, adController.getAd);

// DELETE => /api/ad/:id
router.delete(
  '/:id',
  requireAuth,
  verifyId,
  verifyEntityOwner('ads'),
  adController.deleteAd
);

module.exports = router;
