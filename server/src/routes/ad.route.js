const Router = require('express').Router;
const adController = require('../controllers/ad.controller');
const { upload } = require('../utils/upload');
const validateAd = require('../validators/ad.validator');

const router = Router();

// POST => /api/ad
router.post('/', upload.single('image'), validateAd, adController.addAd);

module.exports = router;
