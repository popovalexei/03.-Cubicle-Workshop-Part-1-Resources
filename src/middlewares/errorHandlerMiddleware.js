const { exactErrorMsg } = require('../utils/errorHandle.js');

module.exports = (err, req, res, next) => {
  const errorMessages = extractErrorMsgs(err);
  res.render('404', { errorMessages });
};
