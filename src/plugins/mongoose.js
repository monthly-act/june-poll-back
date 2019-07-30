const fs = require('fs');
const mongoose = require('mongoose');

const sslOptions = {};
if (process.env.NODE_ENV === 'production1') {
  Object.assign(sslOptions, {
    ssl: true,
    sslValidate: false,
    sslCA: fs.readFileSync('./rds-combined-ca-bundle.pem'),
  });
}

mongoose.connect(
  process.env.MONGODB_URL,
  {
    useNewUrlParser: true,
    ...sslOptions,
  },
).then(() => console.log('Connection to DB successful'))
  .catch(err => console.error(err, 'Error'));
