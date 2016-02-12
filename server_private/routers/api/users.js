// ----------------------
// ****** Modules! ******
// ----------------------
var express = require('express');
var router = express.Router();
var User = require('../../models/user');
// var request = require('request');




// --------------------
// ****** Route! ******
// --------------------


router.post('/authenticate/:username/:password', function(req, res) {
    console.log('checking for authentication');
    // console.log(req.params.username, req.params.password);
    // debugger
    User.findOne({username: req.params.username}, function(err, dbUser) {
      console.log(err, dbUser, 'ERROR ^');
        if (dbUser) {

          console.log(dbUser);
            dbUser.authenticate(req.params.password, function(err, isMatch) {
                if (isMatch) {
                    dbUser.setToken(err, function() {
                        res.json({description: 'Success', token: dbUser.token, '_id': dbUser._id});
                    });
                }
            });
        } else {
          res.json({description: 'No Success', status: 302});
        }
    });
});

router.post('/', function(req, res) {
    var newUser = new User(req.body);
    newUser.save(function(err, dbUser) {
        console.log("err:", err);
        console.log("dbUser:", dbUser);
        res.json(dbUser);
    });
});


//----- USER API ROUTES -----//

router.use(function(req, res, next){
  if(!req.user){
    console.log('No User');
    res.json({status: 302})
  } else {
    console.log('User');
    next();
  }
});

router.get('/:id', function(req, res) {
    User.findById(req.params.id, function(err, dbUser) {
        res.json(dbUser);
    });
});

router.get('/all', function(req, res) {
    User.find({}, function(err, dbUser) {
        res.json(dbUser);
    });
});

router.patch('/:id', function(req, res) {
    User.findById(req.params.id, function(err, dbUser) {
        dbUser.name = req.body.name;
        dbUser.save();
    });
});




// ----------------------
// ****** Exports! ******
// ----------------------
module.exports = router;
