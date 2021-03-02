const adController = {
  addAd: (req, res, next) => {
    try {
      res.send(req.file);
    } catch (err) {
      next(err);
    }
  }
};

module.exports = adController;
