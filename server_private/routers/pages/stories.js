// ----------------------
// ****** Modules! ******
// ----------------------
var express = require('express');
var router = express.Router();
var Story = require('../../models/story');
var User = require('../../models/user');




// --------------------
// ****** Route! ******
// --------------------

router.use(function(req, res, next){
  if(!req.user){
    console.log('No User');
    res.json({status: 302})
  } else {
    console.log('User');
    next();
  }
});


router.get('/', function(req, res) {
  res.render('stories');
});


router.post('/api/users/:userId', function(req, res) {
  // var storyData = req.body.story;
  console.log('Story Data', req.body);
  var id = req.params.userId
  var newStory = new Story(req.body);
  debugger
  newStory.save(function(err, databaseStory) {
      if (!err){
        // find a User
        debugger
        User.findOneAndUpdate(
          {_id: id},
          {$push: {stories: databaseStory}},
          {safe: true, upsert: true},
          function(err, dbUser) {
            if (err) {
              console.log(err);
            } else {
              debugger
            // success!
            console.log('.....story is saved.....');
            res.json( databaseStory );
            }
          }
        ); // added story to user
      }
    }) // successfully saved updates to user
}); // saved story

// });




//----- STORIES API ROUTES -----//
// MOVE TO PAGES/STORIES.JS

// THIS IS FROM GETSUN //
// router.get('/stories', function(req, res) {
//     locateUserByToken();
//     User.findById(req.user._id, function(err, dbUser) {
//         res.json(dbUser);
//     });
// });


// THIS IS FROM GETSUN //
// router.post('users/', function(req, res) {
//     locateUserByToken();
//     User.findById(req.user._id, function(err, dbUser) {
//         console.log(req.body);
//         dbUser.stories.favorites.push(req.body);
//         dbUser.save(function(err, user) {
//             res.json(user);
//             console.log('.....story is saved.....');
//         });
//     });
// });


// THIS IS FROM GETSUN //
// router.patch('/stories/', function(req, res) {
//     console.log('.....deleting.....');
//     User.findById(req.user._id, function(err, dbUser) {
//         function deleteStory(value, param) {
//             console.log("Value:", value, "Param:", param);
//             return value.
//         }
//     })
// })





// ----------------------
// ****** Exports! ******
// ----------------------
module.exports = router;
