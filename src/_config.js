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

// comment for comment sake
module.exports = config;