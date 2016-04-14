var config = {};

config.mongoURI = {
  development: 'mongodb://localhost/first-mean-app',
  test: 'mongodb://localhost/first-mean-app-testing',
  production: process.env.MONGODB_URI
};

// config.SALT_WORK_FACTOR = {
//   test: 10,
//   development: 10,
//   production: 12
// };

// simplified
config.SALT_WORK_FACTOR = 10;
config.TOKEN_SECRET = '\x14\xe1?\xf7\xa6\x1b\xc1pJ\xad"#\xf7H\x9f\ta\xb9\xd7 \xd05NT\xfa'

// comment for comment sake
module.exports = config;