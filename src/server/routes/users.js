var express = require('express');
var router = express.Router();
var moment = require('moment');
var jwt = require('jwt-simple');

var User = require('models/users')
var config = require('../../_config');


router.get('/register', function(req, res, next) {
  //ensure user does not already exist
  User.findOne({email: req.body.email}, function(err, existingUser) {
    if (err) {
      return next(err)
    }
    //user already exists error
    if (existingUser) {
      return res.status(409)
      .json({
        status: 'fail',
        message: 'Email Already Exists'
      });
    }
    //create a new user
    var user = new User(req.body);
    user.save(function(){
      //create token
      var token = generateToken(user)
      res.status(200)
      .json({
        status: 'success',
        data: {
          token: token,
          user: user.email
        }
      })
    })
  })
});

router.get('/login', function(req, res, next) {
  //ensure the user exists
  User.findOne({email: req.body.email}, function(err, existingUser) {
    if (err) {
      return next(err)
    }
    //user already exists error
    if (!existingUser) {
      return res.status(401)
      .json({
        status: 'fail',
        message: 'Email and/or Password is not correct'
      });
    }
    //If email exists compare the plain text password with the hashed/salted password
    user.comparePassword(req.body.password, function(err, match) {
      if (err) {
        return next(err);
      }
      if(!match) {
        return res.status(401)
        .json({
          status: 'fail',
          message: 'Password is not correct'
        });
      }
      user = user.toObject();
      // delete user.password;
      var token = createToken(user);
      res.status(200).json({
        status: 'success',
        data: {
          token: token,
          user: user.email
        }
      });
    });
  });
});

router.get('/logout', function(req, res, next) {

});

//*** helpers ** //

// generate a token
function generateToken (user) {
  var payload = {
    //expiration date
    exp: moment().add(14, 'days').unix()
    //initialization date
    iat: moment().unix();
    sub: user._id
  }
  return jwt.encode(payload, config.TOKEN_SECRET);
}


module.exports = router;
