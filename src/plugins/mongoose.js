const fs = require('fs');
const mongoose = require('mongoose');

mongoose.connect(
  process.env.MONGODB_URL,
  {
    useNewUrlParser: true,
    ssl: true,
    sslValidate: false,
    sslCA: fs.readFileSync('./rds-combined-ca-bundle.pem'),
  },
).then(() => console.log('Connection to DB successful'))
  .catch(err => console.error(err, 'Error'));
