var express = require('express');
var router = express.Router();
var User = require('../../models/user');
// var request = require('request');


//----- USER API ROUTES -----//

router.get('/', function(req, res) {
    User.findById(req.user._id, function(err, dbUser) {
        res.json(dbUser);
    });
});

router.get('/all', function(req, res) {
    User.find({}, function(err, dbUser) {
        res.json(dbUser);
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

router.patch('/edit', function(req, res) {
    User.findById(req.user._id, function(err, dbUser) {
        dbUser.name = req.body.name;
        dbUser.save();
    });
});


router.post('/authenticate/:username/:password', function(req, res) {
    console.log('checking for authentication');
    debugger
    User.findOne({username: req.params.username}, function(err, dbUser) {
        if (dbUser) {
            dbUser.authenticate(req.params.password, function(err, isMatch) {
                if (isMatch) {
                    dbUser.setToken(err, function() {
                        res.json({description: 'Success', token: dbUser.token});
                    });
                }
            });
        } else {
          res.json({description: 'No Success', status: 302});
        }
    });
});



//----- STORIES API ROUTES -----//

router.get('/stories', function(req, res) {
    User.findById(req.user._id, function(err, dbUser) {
        res.json(dbUser);
    });
});

router.post('/stories', function(req, res) {
    User.findById(req.user._id, function(err, dbUser) {
        console.log(req.body);
        dbUser.stories.favorites.push(req.body);
        dbUser.save(function(err, user) {
            res.json(user);
            console.log('.....story is saved.....');
        });
    });
});

// router.patch('/stories/', function(req, res) {
//     console.log('.....deleting.....');
//     User.findById(req.user._id, function(err, dbUser) {
//         function deleteStory(value, param) {
//             console.log("Value:", value, "Param:", param);
//             return value.
//         }
//     })
// })



module.exports = router;
