require('./mongoose');
const cors = require('./cors');
const session = require('./session');
require('./socket');

module.exports = (app) => {
  cors(app);
  session(app);
};
