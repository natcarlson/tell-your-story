var User = require('../models/user');

function loadUser(req, res, next){
  // console.log('token', req.cookies.token);
  if (req.cookies.token) {
    User.findOne({ token: req.cookies.token}, function(err, databaseUser){
      req.user = databaseUser;
      next();
    });
  } else {
    next()
  }
};

module.exports = loadUser;
