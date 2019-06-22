// eslint-disable-next-line consistent-return
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.send(401, 'unauthorized');
}

module.exports = {
  isAuthenticated,
};
