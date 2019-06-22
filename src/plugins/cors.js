const cors = require('cors');

module.exports = (app) => {
  app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  }));
};
