const Router = require('express').Router;
const adController = require('../controllers/ad.controller');
const { upload } = require('../utils/upload');
const validateAd = require('../validators/ad.validator');

const router = Router();

// POST => /api/ad
router.post('/', upload.single('image'), validateAd, adController.addAd);

// PATCH => /api/ad/:id
router.patch('/:id', upload.single('image'), validateAd, adController.updateAd);

// GET => /api/ad
router.get('/', adController.getAds);

// GET => /api/ad/:id
router.get('/:id', adController.getAd);

// DELETE => /api/ad/:id
router.delete('/:id', adController.deleteAd);

module.exports = router;
