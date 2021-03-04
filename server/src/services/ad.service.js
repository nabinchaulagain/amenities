const db = require('../db');

const selectedColumns = ['id', 'title', 'price', 'image', 'views'];

const createAd = async (data) => {
  const adsCreated = await db('ads').insert(data, selectedColumns);
  return adsCreated[0];
};

const adToObj = (ad) => {
  const newAd = { user: {} };
  for (const adProp in ad) {
    if (['email', 'username', 'userId'].includes(adProp)) {
      newAd.user[adProp] = ad[adProp];
    } else {
      newAd[adProp] = ad[adProp];
    }
  }
  return newAd;
};

const getAd = async (id) => {
  const ads = await db('ads')
    .innerJoin('users', 'ads.user_id', 'users.id')
    .select(
      'ads.id',
      'description',
      'title',
      'price',
      'location',
      'image',
      'views',
      'ads.created_at',
      'users.email',
      'users.username',
      'users.id AS userId'
    )
    .where({ 'ads.id': id })
    .limit(1);
  return adToObj(ads[0]);
};

const getAds = () => {
  return db('ads')
    .select(...selectedColumns)
    .orderBy('views', 'desc')
    .orderBy('created_at', 'desc');
};

const updateAd = async (id, data) => {
  const adsUpdates = await db('ads')
    .where({ id })
    .update(data, selectedColumns);
  return adsUpdates[0];
};

const deleteAd = (id) => {
  return db('ads').delete().where({ id });
};

const incrementAdViews = (id, views) => {
  return db('ads')
    .update({ views: views + 1 })
    .where({ id });
};

module.exports = {
  createAd,
  getAd,
  getAds,
  updateAd,
  deleteAd,
  incrementAdViews
};
