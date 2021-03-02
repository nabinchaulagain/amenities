const db = require('../db');
const sendResponse = require('../utils/sendResponse');

const verifyEntityOwner = (entityName) => {
  return async (req, res, next) => {
    const entity = (
      await db(entityName)
        .select('user_id')
        .where({ id: +req.params.id })
        .limit(1)
    )[0];
    // send end 404 response if row not in db
    if (!entity) {
      sendResponse(res, { message: 'Not found' }, 404);
      return;
    }
    // send 403 response if entity does not belong to currentuser
    if (entity.user_id !== req.user.id) {
      sendResponse(res, { message: 'Unauthorized' }, 403);
    } else {
      next();
    }
  };
};

module.exports = verifyEntityOwner;
